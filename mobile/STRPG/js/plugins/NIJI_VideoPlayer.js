//=============================================================================
// Niji - Video Player
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.2 Play videos wherever you want
 * @author Niji
 *
 * @help NIJI_VideoPlayer.js
 *
 * This plugin provides commands to play videos.
 * 
 *   Niji.Video.load(id, filename, loop) - Load video into memory
 *   Niji.Video.unload(id) - Unload video from memory
 *   Niji.Video.move(id, x, y) - Move video around scene
 *   Niji.Video.scale(id, x, y) - Scale video around scene
 *   Niji.Video.play(id) - Play a Video object by id
 *   Niji.Video.pause(id) - Pause a Video object by id
 *   Niji.Video.stop(id) - Stop a Video object by id
 *   Niji.Video.setLoop(id) - Make a Video object playing loop by id
 *   Niji.Video.isReady() - Check if all videos have been loaded
 *
 * Full documentation can be found here:
 * 
 * https://nijikokun.itch.io/video-player-mz
 *
 * @command load
 * @text Preload video into memory
 * @desc Preload video into memory
 *       After this, execute "Play Video" with specified id
 * @arg id
 * @type string
 * @text Video Identifier
 * @desc Video Identifier
 * @arg filename
 * @type string
 * @text Filename (video.webm)
 * @desc Filename of video inside "movies/" directory. Include extension. * 
 * @arg optionsLoop
 * @type boolean
 * @text Should Loop? (true/false)
 * @desc Should the video loop?
 *
 * @command play
 * @text Play video by id
 * @desc Play video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 *
 * @command stop
 * @text Stop video by id
 * @desc Stop video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 *
 * @command unload
 * @text Unload video by id
 * @desc Unload video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command pause
 * @text Pause video by id
 * @desc Pause video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command resume
 * @text Resume video by id
 * @desc Resume video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * 
 * @command move
 * @text Move video by id
 * @desc Move video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * @arg x
 * @type number
 * @text X
 * @desc X Coordinate
 * @arg y
 * @type string
 * @text Y
 * @desc Y Coordinate
 * 
 * @command scale
 * @text Scale video by id
 * @desc Scale video by id
 * @arg id
 * @type string
 * @text Video_Id
 * @desc Video Identifier
 * @arg x
 * @type number
 * @text X
 * @desc X Coordinate
 * @arg y
 * @type string
 * @text Y
 * @desc Y Coordinate
 */

(function() {
    const pluginVersion = "1.0.2";
    const developerName = "NIJI";
    const developerPluginName = "VideoPlayer";
    const pluginName = `${developerName}_${developerPluginName}`;
    
    // Establish developer root
    window.Niji = window.Niji || {};
    window.Niji.videoMap = {};

    //=============================================================================
    // ** Command Registration
    //=============================================================================
    PluginManager.registerCommand(pluginName, "load", args => {
        Video.load(args.id, args.filename, args.optionsLoop);
    });

    PluginManager.registerCommand(pluginName, "play", args => {
        Video.play(args.id);
    });

    PluginManager.registerCommand(pluginName, "pause", args => {
        Video.pause(args.id);
    });

    PluginManager.registerCommand(pluginName, "resume", args => {
        Video.resume(args.id);
    });

    PluginManager.registerCommand(pluginName, "move", args => {
        Video.move(args.id, args.x, args.y);
    });

    PluginManager.registerCommand(pluginName, "scale", args => {
        Video.scale(args.id, args.x, args.y);
    });

    PluginManager.registerCommand(pluginName, "unload", args => {
        Video.stop(args.id);
    });

    //=============================================================================
    // ** Update Spriteset_Base
    //=============================================================================
    const _createUpperLayer = Spriteset_Base.prototype.createUpperLayer

    Spriteset_Base.prototype.createUpperLayer = function () {
        this.createVideos()
        _createUpperLayer.call(this)
    }

    Spriteset_Base.prototype.createVideos = function () {
        this._videosContainer = new Sprite()
        this.addChild(this._videosContainer)
    }

    Spriteset_Base.prototype.addVideo = function (video) {
        this._videosContainer.addChild(video)
    }

    Spriteset_Base.prototype.removeVideo = function (video) {
        this._videosContainer.removeChild(video)
    }
    
    //=============================================================================
    // ** Video Class
    //=============================================================================
    class Video {
        static load (id, name, shouldLoop = false, shouldAutoUnload = false) {
            if (window.Niji.videoMap[id]) {
                console.log(pluginName, `Video with id (${id}) already exists.`, window.Niji.videoMap[id]);
                return;
            }

            let video = PIXI.Sprite.from(`movies/${name}`);

            video._id = id;
            video.__promises = [];
            video.__animations = [];
            video._texture.baseTexture.on('loaded', () => {
                video._loaded = true;
                video._source = video._texture.baseTexture.resource.source;
                video._source.loop = shouldLoop;
                video.width = video._source.videoWidth;
                video.height = video._source.videoHeight;
                if (video.__promises.length) {
                    for (const fn of video.__promises) {
                        fn(video);
                    }
                }
            });

            video.update = () => {
                video._texture.update();
                if (video.__animations.length) {
                    let animations = video.__animations[0];

                    // Iterate over the animations and play them.
                    for (let i = 0; i < animations.length; i++) {
                        const animation = animations[i];
                        if (VideoAnimations[animation.type]) {
                            VideoAnimations[animation.type](video, animations[i]);
                            if (window.Niji.debug) console.log(pluginName, `[update]`, animations[i].duration)
                        }
                    }

                    // Check for empty durations, remove if they exist
                    for (let i = animations.length - 1; i >= 0 ; i--) {
                        if (animations[i].duration <= 0) {
                            if (window.Niji.debug) console.log(pluginName, `[update]`, `Animations queue item has finished, removing.`)
                            animations.splice(i, 1);
                        }
                    }
                    
                    // If the animation array is empty, remove it
                    if (!animations.length) {
                        if (window.Niji.debug) console.log(pluginName, `[update]`, `Animations queue entry is empty, removing.`)
                        video.__animations.splice(0, 1);
                    }
                }
            }

            if (shouldAutoUnload) {
                Video.setAutoUnload(id);
            }

            window.Niji.videoMap[id] = video;

            return video;
        }

        static get (from, reference) {
            let video = null;

            if (typeof reference === 'object') {
                video = reference;
            } else {
                video = window.Niji.videoMap[reference];
            }

            if (!video) {
                console.log(pluginName, `[${from}]`, `No video with id ${reference} was found.`)
                return;
            }

            return video;
        }

        static setAutoUnload (id) {
            let video = Video.get("setAutoUnload", id);
            if (!video) return;

            video._texture.baseTexture.on('ended', () => {
                Video.unload(id);
            });
        }

        static setLoop (id) {
            let video = Video.get("setLoop", id);
            if (!video) return;

            invoke(video, () => {
                video._source.loop = true;
            });
        }

        static animate (id, animations) {
            let video = Video.get("animate", id);
            if (!video) return;

            invoke(video, () => {
                video.__animations.push(animations)
            });
        }

        static move (id, x, y) {
            let video = Video.get("move", id);
            if (!video) return;

            invoke(video, () => {
                video.x = x;
                video.y = y;
            });
        }

        static moveAnim (id, x, y, duration) {
            let video = Video.get("moveAnim", id);
            if (!video) return;

            video.__animations.push([{ type: 'move', duration, x, y }]);
        }

        static scale (id, x, y) {
            let video = Video.get("scale", id);
            if (!video) return;

            invoke(video, () => {
                video.scale.x = x;
                video.scale.y = y;
            });
        }

        static scaleAnim (id, x, y, duration) {
            let video = Video.get("scaleAnim", id);
            if (!video) return;

            video.__animations.push([{ type: 'scale', duration, x, y }]);
        }

        static flipH (id) {
            let video = Video.get("flipH", id);
            if (!video) return;

            invoke(video, () => {
                video.scale.x *= -1;
                if (video.scale.x < 0) {
                    video.x += video.width * Math.abs(video.scale.x);
                } else {
                    video.x -= video.width * Math.abs(video.scale.x);
                }
            });
        }

        static flipV (id) {
            let video = Video.get("flipV", id);
            if (!video) return;

            invoke(video, () => {
                video.scale.y *= -1;
                if (video.scale.y < 0) {
                    video.y += video.height * Math.abs(video.scale.y);
                } else {
                    video.y -= video.height * Math.abs(video.scale.y);
                }
            });
        }

        static opacity (id, o) {
            let video = Video.get("opacity", id);
            if (!video) return;

            invoke(video, () => {
                video.alpha = o;
            });
        }

        static opacityAnim (id, opacity, duration) {
            let video = Video.get("opacityAnim", id);
            if (!video) return;

            video.__animations.push([{ type: 'opacity', duration, opacity }]);
        }

        static play (id, shouldAutoUnload = false) {
            let video = Video.get("play", id);
            if (!video) return;

            invoke(video, () => {
                SceneManager._scene._spriteset.addVideo(video);
                video._source.play();
                if (shouldAutoUnload) Video.setAutoUnload(id);
            })
        }

        static pause (id) {
            let video = Video.get("pause", id);
            if (!video) return;

            invoke(video, () => {
                video._source.pause()
            })
        }

        static resume (id) {
            let video = Video.get("resume", id);
            if (!video) return;

            invoke(video, () => {
                video._source.play()
            })
        }

        static stop (id) {
            let video = Video.get("stop", id);
            if (!video) return;
            
            invoke(video, () => {
                SceneManager._scene._spriteset.removeVideo(video)
                video._source.pause()
            })
        }

        static unload (id) {
            let video = Video.get("unload", id);
            if (!video) return;

            invoke(video, () => {
                try {
                    SceneManager._scene._spriteset.removeVideo(video);
                } catch (e) {}
                try {
                    video._source.pause();
                    video._texture.baseTexture.destroy();
                    video._texture.destroy();
                    video.destroy();
                } catch (e) {
                    console.log(e);
                }

                try {
                    delete window.Niji.videoMap[video._id];
                } catch (e) {
                    console.log(e);
                }
            });
        }

        static isReady () {
            return !Object.values(window.Niji.videoMap).some((video) => !video._loaded)
        }

        //=============================================================================
        // * Class Style
        //=============================================================================
        constructor (id, name, shouldLoop = false, shouldAutoUnload = false) {
            this.video = Video.load(id, name, shouldLoop, shouldAutoUnload);
        }

        animate (animations) { Video.animate(this.video._id, animations); return this; }
        move (x, y) { Video.move(this.video._id, x, y); return this; }
        scale (x, y) { Video.scale(this.video._id, x, y); return this; }
        opacity (alpha) { Video.opacity(this.video._id, alpha); return this; }
        moveAnim (x, y, duration) { Video.moveAnim(this.video._id, x, y, duration); return this; }
        scaleAnim (x, y, duration) { Video.scaleAnim(this.video._id, x, y, duration); return this; }
        opacityAnim (alpha, duration) { Video.opacity(this.video._id, alpha, duration); return this; }
        play () { Video.play(this.video._id); return this; }
        pause () { Video.pause(this.video._id); return this; }
        resume () { Video.resume(this.video._id); return this; }
        stop () { Video.stop(this.video._id); return this; }
        unload () { Video.unload(this.video._id); return this; }
    }

    //=============================================================================
    // * Invokation helper for when videos aren't loaded yet.
    //=============================================================================

    const invoke = (video, fn) => {
        if (!video._source) {
            video.__promises.push(fn)
        } else {
            fn(video);
        }
    }


    //=============================================================================
    // ** Video Animations
    //=============================================================================

    class VideoAnimations {
        static move (video, anim) {
            if (anim.duration <= 0) return;
            video.x = (video.x * (anim.duration - 1) + anim.x) / anim.duration;
            video.y = (video.y * (anim.duration - 1) + anim.y) / anim.duration;
            anim.duration--;
            return anim;
        }

        static scale (video, anim) {
            if (anim.duration <= 0) return;
            video.scale.x = (video.scale.x * (anim.duration - 1) + anim.x) / anim.duration;
            video.scale.y = (video.scale.y * (anim.duration - 1) + anim.y) / anim.duration;
            anim.duration--;
            return anim;
        }

        static opacity (video, anim) {
            if (anim.duration <= 0) return;
            video.alpha = (video.alpha * (anim.duration - 1) + anim.opacity) / anim.duration;
            anim.duration--;
            return anim;
        }
    }

    window.Niji.Video = Video;
    window.Niji.Video.version = pluginVersion;

})();