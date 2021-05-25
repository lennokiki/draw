(function (global) {
  
  'use strict';
  
  global.Draw = Draw

  var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  var cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23F44336;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"
  var dialogElems = []
  // var drawJsons = []
  
  var constants = {
    bgKey: 'bg',
    shapeKey: 'shape',
    fullscreenKeycode: 'F8', // F8
    stopFullscreenKeycode: 'F9' // F9
  }
  
  var globalConfig = {
    assets: '/assets', // 静态资源路径
    menusPath: '/theme/menus.json', // 菜单配置路径
    imagesPath: '/theme/images.json', // 图片配置路径
    imagePrefixPath: '/theme/images', // 图片统一前缀地址
    loadingImage: '/assets/images/loading.gif', // 加载动画图片
    defaultBg: 10001,
    defaultIcon: '/assets/images/icon.png',
    groupIcon: '/assets/images/group.png'
  }

  var trimStart = (function (path) {
    return trimSeparator(true)
  })()

  var trimEnd = (function (path) {
    return trimSeparator()
  })()

  
  function Draw (options) {
    this.options = options
    this.store = new Store()
    // 文件json
    this.file = null
    this.canvas = null
    this.zoom = 1
    this.config = {
      bg: null,
      shape: null
    }
    this.fullScreenPlay = false
    this.drawPoints = []
    this.drawPath = null
    this.animationDraw = false
    this.toolbarsInstance = null
    this.menuInstance = null
    this.playInstance = null
    this.menus = []
    this.observer = new Observer()
    this.init()
  }
  
  Draw.prototype = {
    type: 'Draw',
    constructor: Draw,
  
    init: function () {
      this.showLoading()

      this.initRegister()
      
      this.initMenus()

      this.extendFabricControl()
      
      this.canvas = new fabric.Canvas(this.options.canvasContainer, {
        width: this.options.width,
        height: this.options.height
      })
      this.canvas.stopContextMenu = true

      // 在fabric中右键点击事件实际上会在左键单击事件中触发，需要开启以下配置
      this.canvas.fireRightClick = true
      
      this.initCanvasEvent()

      this.initToolbars()

      this.initPlay()
    },

    initMenus: function () {
      var menuOptions = {
        container: this.options.menuContainer,
        observer: this.observer
      }
      this.menuInstance = new Menu(menuOptions)
    },

    initToolbars: function () {
      var toolbarsOptions = {
        container: this.canvas.getElement().parentNode,
        barClick: this.barClick.bind(this),
        observer: this.observer
      }
      this.toolbarsInstance = new Tools(toolbarsOptions)
    },

    initPlay: function () {
      var playOptions = {
        canvas: this.canvas,
        observer: this.observer,
        getFile: this.getFile.bind(this),
        startDrawPath: this.startDrawPath.bind(this),
        completeDrawPath: this.handlePathDrawComplete.bind(this),
        deleteDrawPath: this.handleDeleteDrawPath.bind(this),
        toggleDrawPath: this.handleToggleDrawPath.bind(this),
        renderPolyline: this.handleRenderPolyLine.bind(this),
        fakeRemoveDrawPath: this.handleFakeRemoveDrawPath.bind(this),
      }
      this.playInstance = new Play(playOptions)
    },

    initCanvasEvent: function () {
      var _g = this.canvas
      var _s = this
      _g.on({
        // 'object:moving': _s.updateAnimationPathPoint.bind(this),
        // 'object:scaling': _s.updateAnimationPathPoint.bind(this),
        // 'object:resizing': _s.updateAnimationPathPoint.bind(this),
        // 'object:rotating': _s.updateAnimationPathPoint.bind(this),
        // 'object:skewing': _s.updateAnimationPathPoint.bind(this),
        /* 滚轮缩放 */
        'mouse:wheel': function (e) {
          /* 放大缩小会影像图像坐标 暂时注释 */
          return 
          var zoom = (e.e.deltaY > 0 ? -0.1 : 0.1) + _g.getZoom()
          zoom = Math.max(0.1, zoom)
          zoom = Math.min(3, zoom)
          var zoomPoint = new fabric.Point(e.pointer.x, e.pointer.y)
          _g.zoomToPoint(zoomPoint, zoom)
        },

        /* 鼠标移动 */
        'mouse:move': function (e) {
          if (_s.isShapeActive()) {
            var thumbnail = _s.config.shape.thumbnail
            _g.defaultCursor = `url("http://localhost${thumbnail}"), auto`
          }
        },

        /* 鼠标进入操作区 */
        'mouse:over': function (e) {

        },

        'mouse:out': function (e) {
          _g.defaultCursor = 'auto'
        },

        /* 鼠标按下 */
        'mouse:down': function (e) {
          if (!_s.isDrawing()) {
            return showMessage('请先创建文件')
          }

          // 动画路径绘制状态开启
          if (_s.animationDraw) {
            _s.cancelActive()

            if (e.button === 3) {
              _s.handlePathDrawComplete()
              return
            }

            _s.handleDrawPoint(e)
            return
          }
          
          if (_s.isShapeActive()) {
            /* 右键取消绘制状态 */
            if (e.button === 3) {
              _s.cancelActive()
              return
            }
            _s.addImageShape(e)
          }
        },
      })
    },
    
    // updateAnimationPathPoint: function (ev) {
    //   // target是animation运动的轨迹元素
    //   if (ev.target && ev.target.pathId) {
    //     var coords = ev.target.points
    //     console.log('coords..', coords)
    //     this.playInstance.handleDrawPathComplete(coords)
    //     console.log('cord', target.getCoords())
    //     console.log('cord', target.calcCoords())
    //     // this.handlePathDrawComplete()
    //   }
    // },
    
    /* 添加图片 */
    addImageShape: function (e) {
      var shape = this.config.shape
      var _g = this.canvas
      fabric.Image.fromURL(shape.path, function(img) {
        var shapeId = uuid()
        img.setPositionByOrigin({x: e.pointer.x, y: e.pointer.y}, 'center', 'center')
        img.perPixelTargetFind = true;
        img.set('shape', shape)
        img.set('shapeId', shapeId)
        img.set('saveObj', {shapeId: shapeId})
        _g.add(img);
      });
    },
    
    /* 显示载入loading */
    showLoading: function () {
      var loadingOuterElem = createTag('div', 'draw-loading-outer')
      var loadingImg = createTag('img', 'draw-loading-image')
      loadingImg.src = globalConfig.loadingImage
      loadingOuterElem.appendChild(loadingImg)
      document.body.appendChild(loadingOuterElem)
    },
  
    hideLoading: function () {
      var loadingElem = document.querySelector('.draw-loading-outer')
      if (loadingElem) {
        loadingElem.parentNode.removeChild(loadingElem)
      }
    },

    /* 注册预定事件 */
    initRegister: function () {
      var _s = this
      // 菜单加载完毕
      this.observer.register('fetch:menuLoaded', function (menus) {
        setTimeout(function () {
          _s.hideLoading()
        }, 100)
        _s.menus = menus
      })

      // 切换选中icon
      this.observer.register('shape:click', function (shape) {
        _s.config.shape = shape
      })

      // 切换选中背景
      this.observer.register('bg:click', function (bg) {
        _s.config.bg = bg
        _s.toggleDrawBg()
      })

      // 更新animation
      this.observer.register('update:animateShape', function (shape, unUpdateDom) {
        var index = _s.file.animations.findIndex(function (item) {
          return item.id === shape.id
        })
        
        if (index !== -1) {
          _s.file.animations.splice(index, 1, shape)
        } else {
          _s.file.animations.push(shape)
        }

        if (!unUpdateDom) {
          _s.playInstance.update(_s.file.animations)
        }
      })

      // 删除animation
      this.observer.register('delete:animateShape', function (shape) {
        _s.file.animations = _s.file.animations.filter(function (item) {
          return item.id !== shape.id
        })
        _s.playInstance.update(_s.file.animations)
        if (_s.drawPath) {
          _s.handleDeleteDrawPath()
        }
      })

      // 全屏播放结束
      this.observer.register('play:end', function () {
        if (_s.fullScreenPlay) {
          _s.fullScreenPlay = false
          _s.handleStop()
          _s.showToolBar()
          _s.showMenus()
          _s.handleResize()
        }
      })
      
      // 全屏播放开始
      document.addEventListener('keydown', function (event) {
        var code = getKeycode(event)
        if (code === constants.fullscreenKeycode) {
          setTimeout(function () {
            _s.handlePlay(function () {
              _s.hideToolBar()
              _s.hideMenus()
              _s.handleResize()
              _s.fullScreenPlay = true
            })
          }, 300)
        }
      })

      // 全屏播放结束
      document.addEventListener('keydown', function (event) {
        var code = getKeycode(event)
        if (code === constants.stopFullscreenKeycode) {
          _s.fullScreenPlay = false
          _s.handleStop()
          _s.showToolBar()
          _s.showMenus()
          _s.handleResize()
        }
      })
    },

    hideToolBar: function () {
      this.toolbarsInstance.toolElem.style.display = 'none'
    },

    showToolBar: function () {
      this.toolbarsInstance.toolElem.style.display = 'block'
    },

    hideMenus: function () {
      this.menuInstance.menuContainer.style.display = 'none'
    },

    showMenus: function () {
      this.menuInstance.menuContainer.style.display = 'block'
    },
  
    /* 切换画布背景 */
    toggleDrawBg: function () {
      if (this.config.bg == null) return
      var _g = this.canvas
      var bg = this.config.bg
      // 重置已经设置的背景
      this.canvas.backgroundColor = ""
      this.canvas.backgroudImage = null
      
      var isUnsetBackground = bg.bgType === 1
      var isPreCorlorBackground = bg.bgType === 2
      var isImageBackground = bg.bgType === 3
      if (isUnsetBackground) {
        _g.setBackgroundColor(bg.color, _g.renderAll.bind(_g))
        return
      }

      if (isPreCorlorBackground) {
        _g.setBackgroundColor(bg.color, _g.renderAll.bind(_g))
        return
      }

      if (isImageBackground) {
        _g.setBackgroundColor({
          source: bg.path,
          repeat: 'repeat',
        }, _g.renderAll.bind(_g))
      }
    },

    /* 是否有绘制图形处于激活状态 */
    isShapeActive: function () {
      return this.config.shape != null
    },

    /* 是否处于绘制状态 */
    isDrawing: function () {
      return this.file != null
    },

    /* 取消绘制 */
    cancelActive: function () {
      this.config.shape = null
      this.menuInstance.unsetShapeActive()
      this.canvas.defaultCursor = 'auto'
    },

    /* 添加fabric扩展 */
    extendFabricControl: function () {
      var _s = this
      var deleteImg = document.createElement('img');
      deleteImg.src = deleteIcon;

      var cloneImg = document.createElement('img');
      cloneImg.src = cloneIcon;

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = 'blue';
      fabric.Object.prototype.cornerStyle = 'circle';
      
      function renderIcon(icon) {
        return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
          var size = this.cornerSize;
          ctx.save();
          ctx.translate(left, top);
          ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
          ctx.drawImage(icon, -size/2, -size/2, size, size);
          ctx.restore();
        }
      }
    
      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: _s.deleteObject.bind(_s),
        render: renderIcon(deleteImg),
        cornerSize: 24
      });
    
      fabric.Object.prototype.controls.clone = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: function (evt, transform) {
          evt.stopPropagation()
          var target = transform.target;
          var shapes = [target]
          var isGroup = typeof target.getObjects === 'function'
          if (isGroup) {
            shapes = target.getObjects()
          }
          _s.clone(shapes)
        },
        render: renderIcon(cloneImg),
        cornerSize: 24
      });
    },

    deleteObject: function (ev, transform) {
      ev.stopPropagation()
      var target = transform.target;
      var _s = this
      let shapes = [target]
      // 分组删除
      const isMultiple = typeof target.getObjects === 'function'
      if (isMultiple) {
        shapes = target.getObjects()
      }

      // 已经编组过
      if (target.type === 'group') {
        shapes = [target]
      }

      shapes.forEach(function (shape) {
        _s.canvas.remove(shape);
      })

      // 清除选中状态
      this.canvas.discardActiveObject()
      this.canvas.renderAll();
      this.clearAnimations(shapes)
    },

    clearAnimations: function (shapes) {
      // 清除animations中对应的数据
      var delShapeIds = shapes.map(function (item) { return item.shapeId })
      var nextAnimations = this.file.animations.filter(function (item) {
        return !delShapeIds.includes(item.shape.shapeId)
      })
      this.file.animations = nextAnimations
      this.playInstance.update(nextAnimations, delShapeIds)
    },
    
    /* 克隆编组或单个图形 */
    clone: function (shapes) {
      var isGroup = shapes.length > 1
      var _s = this
      var baseX = 0
      var baseY = 0
      var delta = 10

      if (isGroup) {
        var group = shapes[0].group
        baseX = Math.floor(group.left + group.width / 2)
        baseY = Math.floor(group.top + group.height / 2)
      }

      shapes.forEach(function (shape) {
        shape.clone(function (cloned) {
          cloned.left += delta + baseX;
          cloned.top += delta + baseY;
          _s.canvas.add(cloned);
        })
      })
    },

    /* 工具栏点击事件 */
    barClick: function (type) {
      switch (type) {
        case 'canvas:create':
          this.handleCreateNewDraw()
          break;
        case 'canvas:load':
          this.handleLoadDraw()
          break;
        case 'canvas:save':
          this.handleSaveDraw()
          break;
        case 'canvas:clear':
          this.handleClearCanvas()
          break;
        case 'canvas:export':
          this.handleExportCanvas()
          break;
        case 'shape:delete':
          this.handleDeleteShape()
          break;
        case 'shape:clone':
          this.handleCloneShape()
          break;
        case 'shape:compose':
          this.handleSetGroup()
          break;
        case 'shape:separate':
          this.handleUnsetGroup()
          break;
        case 'shape:unactive':
          this.menuInstance.unsetShapeActive()
          break;
        case 'action:setting':
          this.handleSetting()
          break;
        case 'action:play':
          this.handlePlay()
          break;
        case 'action:stop':
          this.handleStop()
      }
    },

    /* 获取文件 */
    getFile: function () {
      return this.file
    },

    /* 开启动画绘制 */
    startDrawPath: function () {
      this.handleDeleteDrawPath()
      this.animationDraw = true
    },

    createNewFile: function (file) {
      this.canvas.clear()
      this.file = {
        name: file,
        id: uuid(),
        animations: [],
        data: null
      }
      this.menuInstance.setActiveBg(globalConfig.defaultBg)
      if (this.drawPath) {
        this.canvas.remove(this.drawPath)
      }
      this.drawPath = null
      this.drawPoints = []
      showMessage('创建新绘制图成功')
      hideDialog()
      this.playInstance.clear()
      this.playInstance.hide()
    },
    
    handlePathDrawComplete: function () {
      this.animationDraw = false
      this.playInstance.handleDrawPathComplete(this.drawPoints)
      this.drawPoints = []
    },

    handleDeleteDrawPath: function () {
      if (this.drawPath) {
        this.canvas.remove(this.drawPath)
        this.canvas.renderAll()
        this.drawPath = null
      }
      this.animationDraw = false
      this.drawPoints = []
      this.playInstance.handleDrawPathComplete(this.drawPoints)
    },

    handleToggleDrawPath: function () {
      if (this.drawPath) {
        var nextVisible = !this.drawPath.visible
        this.drawPath.visible = nextVisible
        this.canvas.renderAll()
      }
    },

    handleResize: function () {
      var { width, height } = this.options.wrapper.getBoundingClientRect()
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);
      this.canvas.calcOffset();      
    },

    handleDrawPoint: function (e) {
      var x = e.pointer.x
      var y = e.pointer.y
      this.drawPoints.push({ x: x, y: y })
      // 绘制路径线
      this.handleRenderPolyLine()
    },

    handleRenderPolyLine: function (points) {
      this.canvas.remove(this.drawPath)
      this.canvas.renderAll()
      points = points || this.drawPoints
      
      this.drawPath = new fabric.Polyline(points, {
        fill: null,
        stroke: 'red',
        strokeWidth: 5,
        evented: false,
        selectable: false,
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
      });

      this.drawPath.set('pathId', uuid())
      this.canvas.add(this.drawPath)
      this.canvas.renderAll()
    },

    handleCreateNewDraw: function () {
      var inputElem = createTag('input', 'draw-input')
      var _s = this
      inputElem.placeholder = '请输入文件名称'
      var options = {
        title: '创建新绘制图',
        context: inputElem,
        confirm: function () {
          if (inputElem.value == null || inputElem.value == '') {
            return showMessage('请输入文件名称')
          }
          _s.createNewFile(inputElem.value)
        }
      }
      showDialog(options)
    },

    handleClearCanvas: function () {
      var hElem = createTag('h4')
      hElem.innerHTML = '确定要清除画布么？'
      var _s = this
      var options = {
        title: '提示',
        context: hElem,
        confirm: function () {
          _s.canvas.clear()
          _s.drawPath = null
          _s.drawPoints = []

          _s.file.animations = []
          _s.file.data = null
          _s.menuInstance.setActiveBg(globalConfig.defaultBg)
          _s.playInstance.hide()
          _s.playInstance.clear()
          hideDialog()
        }
      }
      showDialog(options)
    },

    handleDeleteShape: function () {
      var shapes = this.canvas.getActiveObjects()
      var _s = this
      shapes.forEach(function (shape) {
        _s.canvas.remove(shape);
      })

      // 清除选中状态
      this.canvas.discardActiveObject()
      this.canvas.requestRenderAll();
      this.clearAnimations(shapes)
    },

    handleCloneShape: function () {
      var shapes = this.canvas.getActiveObjects()
      this.clone(shapes)
    },

    transferJSON: function () {
      var json = this.canvas.toJSON(['shape', 'shapeId'])
      // 重置背景图片地址和图形图片的地址
      // 纯色背景图片不需要重置
      if (!this.config.bg.color) {
        json.background.source = this.config.bg.path
      }
      // 重置图片图形
      json.objects.forEach(function (obj) {
        if (obj.shape && obj.shape.type === 'icon') {
          obj.src = obj.shape.path
        }
      })

      return json
    },

    handleFakeRemoveDrawPath: function () {
      if (this.drawPath) {
        this.drawPath.visible = false
        this.canvas.renderAll()
      }
    },

    handleSaveDraw: function () {
      if (!this.isDrawing()) {
        return showMessage('没有可保存的文件', 'warning')
      }
      // 样式上清除动画的路径
      if (this.drawPath) {
        this.canvas.remove(this.drawPath)
        this.drawPath = null
      }

      // 模拟 存档 

      this.file.data = this.transferJSON()
      this.file.date = createDate()
      this.file.bg = this.config.bg

      this.store.save(this.file)
      showMessage('保存成功', 'success')
    },

    handleLoadDraw: function () {
      var _s = this
      var _g = this.canvas
      var fileListOptions = {
        data: this.store.get(),
        onSelect: function (json) {
          _s.file = json
          _s.config.bg = json.bg
          _s.showLoading()
          _g.loadFromJSON(json.data, function () {
            _g.renderAll.bind(_g)
            _s.hideLoading()
            showMessage('载入成功', 'success')
            hideDialog()
            setTimeout(function () {
              _s.updateAnimationShape()
            }, 100)
            _s.menuInstance.setActiveBg(json.bg.id)
            _s.playInstance.hide()
          })
        },
        
        onDelete: function (json, elem, renderEmpty) {
          // drawJsons = drawJsons.filter(function (item) {
          //   return item.id !== json.id
          // })
          this.store.delete(json.id)
          elem.parentNode.removeChild(elem)
          // 数据空时单独处理
          if (!this.store.get().length) {
            renderEmpty()
          }
          showMessage('删除成功', 'success')
        }
      }

      var options = {
        title: '载入文件',
        context: renderFileList(fileListOptions),
        hideFooter: true
      }

      showDialog(options)
    },

    handleExportCanvas: function () {
      if (!this.isDrawing()) {
        return showMessage('没有可导出的图片', 'warning')
      }
      var dataURL = this.canvas.toDataURL({
        format: 'png',
        quality: '1'
      })
      var elem = createTag('a')
      elem.download = this.file.name
      elem.href = dataURL
      document.body.appendChild(elem)
      elem.click()
      elem.parentNode.removeChild(elem)
    },

    handleSetGroup: function () {
      if (!this.canvas.getActiveObject()) return
      if (this.canvas.getActiveObject().type !== 'activeSelection') return
      // 清除编组前或已经设置单个元素的动画
      var shapes = this.canvas.getActiveObjects()
      this.clearAnimations(shapes)
      // 编组
      var group = this.canvas.getActiveObject().toGroup()
      group.set('shapeId', uuid());
      this.canvas.requestRenderAll();
    },

    handleUnsetGroup: function () {
      if (!this.canvas.getActiveObject()) return
      var groupShape = this.canvas.getActiveObject()
      if (groupShape.type !== 'group') return
      this.canvas.getActiveObject().toActiveSelection();
      // 清除分组前或已经设置的编组动画
      this.clearAnimations([groupShape])
      this.canvas.requestRenderAll();
    },

    handleSetting: function () {
      if (!this.isDrawing()) {
        return showMessage('没有可进行操作的文件', 'warning')
      }
      this.playInstance.clear()
      var isShow = this.playInstance.visible
      if (isShow) {
        this.playInstance.hide()
      } else {
        this.playInstance.show(this.file.animations)
      }
    },

    handlePlay: function (callback) {
      if (!this.isDrawing()) {
        return showMessage('没有可进行播放的动画', 'warning')
      }
      this.playInstance.hide()
      this.playInstance.handleAnimationPlay()
      callback && callback()
    },

    handleStop: function () {
      if (!this.isDrawing()) {
        return showMessage('没有可进行停止的动画', 'warning')
      }
      this.playInstance.handleAnimationStop()
    },

    updateAnimationShape: function () {
      var animations = this.file.animations
      var objs = this.canvas.getObjects()
      animations.forEach(function (item) {
        var nextShape = objs.find(function (obj) {
          return obj.shapeId === item.shapeId
        })
        if (nextShape) {
          item.shape = nextShape
        }
      })
    }
  }
  

  /* 事件总线 */
  function Observer () {
    this.events = []
  }
  
  Observer.prototype = {
    type: 'Observer',
    constructor: Observer,
  
    register: function (name, handler) {
      const obj = {
        name: name,
        handler: handler
      }
  
      this.events.push(obj)
    },
  
    trigger: function (name) {
      var arg = [].slice.call(arguments)
      this.events.forEach(function (evt) {
        if (evt.name === name) {
          evt.handler.apply(null, arg.slice(1))
        }
      })
    },
  
    remove: function (name) {
      this.events = this.events.filter(function (item) {
        return evt.name !== name
      })
    }
  }
  
  /**
   * 菜单构造器
   */
  function Menu (options) {
    this.options = options
    this.loadedCount = 0
    this.menuContainer = null
    this.menus = []
    this.originMenus = []
    this.images = []
    this.init()
  }
  
  Menu.prototype = {
    type: 'Menu',
    constructor: Menu,
  
    init () {
      this.menuContainer = document.getElementById(this.options.container)
      this.loadMenus()
      this.loadImages()
    },
  
    loadMenus: function () {
      var _s = this
      fabric.util.request(globalConfig.menusPath, {
        method: 'GET',
        onComplete: function (data) {
          data = JSON.parse(data.response)
          _s.loadedCount++
          _s.originMenus = data
          _s.composeMenus()
        }
      })
    },

    loadImages: function () {
      var _s = this
      fabric.util.request(globalConfig.imagesPath, {
        method: 'GET',
        onComplete: function (data) {
          data = JSON.parse(data.response)
          _s.loadedCount++
          _s.images = data
          _s.composeMenus()
        }
      })
    },
  
    composeMenus: function () {
      // menu 和 images 全部加载完毕后执行
      var _s = this
      if (this.loadedCount === 2) {
        var menus = this.originMenus.map(function (menu) {
          const children = _s.images.filter(function (item) {
            if (item.menu === menu.id) {
              item.thumbnail = `${globalConfig.imagePrefixPath}/${trimStart(item.thumbnail)}`
              item.path = `${globalConfig.imagePrefixPath}/${trimStart(item.path)}`
              return true
            }
          })
          menu.children = children
          return menu
        })

        this.menus = menus
        this.renderMenus()
        this.options.observer.trigger('fetch:menuLoaded', menus)
      }
    },
    
    renderMenus: function () {
      var menuOuterElem = createTag('div', 'draw-menu-wrapper')
      var fragment = document.createDocumentFragment()
      var _s = this
      this.menus.forEach(function (menu) {
        var menuItemElem = createTag('div', 'draw-menu-item')
        var titleElem = _s.renderTitle(menu)
        var iconsElem = _s.renderIcons(menu)
        menuItemElem.appendChild(titleElem)
        menuItemElem.appendChild(iconsElem)
        fragment.appendChild(menuItemElem)
      })

      menuOuterElem.appendChild(fragment)
      this.menuContainer.appendChild(menuOuterElem)
    },

    
    renderTitle: function (menu) {
      var menuItemTitleElem = createTag('div', 'draw-menu-title')
      menuItemTitleElem.innerHTML = menu.label

      return menuItemTitleElem
    },

    renderIcons: function (menu) {
      var menuItemTitleElem = createTag('div', 'draw-icons-container')
      var children = menu.children || []
      var _s = this
      if (Array.isArray(children) && children.length) {
        var fragment = document.createDocumentFragment()
        children.forEach(function (child) {
          var iconElem = _s.renderIcon(child)
          fragment.appendChild(iconElem)
        })
        menuItemTitleElem.appendChild(fragment)
      } else {
        menuItemTitleElem.classList.add('empty')
        menuItemTitleElem.innerHTML = '暂无图形'
      }

      return menuItemTitleElem
    },

    renderIcon: function (icon) {
      var _s = this
      var isBgIcon = icon.bus === constants.bgKey
      var iconOuterElem = createTag('div', 'draw-icon-item')
      var labelElem = createTag('p', 'draw-icon-label')
      labelElem.innerHTML = icon.label
      var iconElem = null

      if (icon.bgType !== 2) {
        iconElem = createTag('img', 'draw-icon-thumbnail')
        iconElem.src = globalConfig.defaultIcon
      } else {
        iconElem = createTag('div', 'draw-icon-pureimage')
        iconElem.style.backgroundColor = icon.color
        // 添加切换颜色控件
        var settingInput = createTag('input', 'draw-icon-setting')
        settingInput.setAttribute('type', 'color')
        settingInput.setAttribute('value', icon.color)
        settingInput.addEventListener('change', function (ev) {

          ev.stopPropagation()
          var color = ev.currentTarget.value
          var parent = ev.currentTarget.parentNode.parentNode
          iconElem.style.backgroundColor = color
          icon.color = color

          // 当前纯色处于激活状态触发切换图区背景
          if (parent.classList.contains('active')) {
            _s.options.observer.trigger('bg:click', icon)
          }
        })
        iconElem.appendChild(settingInput)
      }
      iconOuterElem.appendChild(iconElem)
      iconOuterElem.appendChild(labelElem)

      // 设置自定义属性
      iconOuterElem.setAttribute('icon-id', icon.id)
      iconOuterElem.setAttribute('icon-bus', icon.bus)
      iconOuterElem.addEventListener('click', function (evt) {
        var target = evt.currentTarget
        var bus = target.getAttribute('icon-bus')
        // 切换背景
        if (bus === constants.bgKey) {
          var bgElems = document.querySelectorAll('.draw-icon-item.bg')
          bgElems.forEach(function (item) {
            item.classList.remove('active')
          })
          target.classList.add('active')
          _s.options.observer.trigger('bg:click', icon)
        }

        // 切换图标
        if (bus === constants.shapeKey) {
          _s.unsetShapeActive()
          target.classList.add('active')
          _s.options.observer.trigger('shape:click', icon)
        }
      })

      // 设置默认选中背景
      if (isBgIcon) {
        iconOuterElem.classList.add('bg')
        if (icon.id === globalConfig.defaultBg) {
          iconOuterElem.classList.add('active')
          _s.options.observer.trigger('bg:click', icon)
        }
      } else {
        iconOuterElem.classList.add('shape')
      }
      
      // 预加载
      var image = new Image()
      image.src = icon.thumbnail
      image.onload = function () {
        image = null
        iconElem.src = icon.thumbnail
      }
      
      return iconOuterElem
    },

    unsetShapeActive: function () {
      var shapeElems = document.querySelectorAll('.draw-icon-item.shape')
      shapeElems.forEach(function (item) {
        item.classList.remove('active')
      })
    },

    setActiveBg: function (activeId) {
      var bgElems = document.querySelectorAll('.draw-icon-item.bg')
      var _s = this
      bgElems.forEach(function (item) {
        item.classList.remove('active')
        var id = +item.getAttribute('icon-id')
        if (id === activeId) {
          item.classList.add('active')
          var icon = _s.images.find((item) => item.id === id)
          _s.options.observer.trigger('bg:click', icon)
        }
      })
    }

  }

  /**
   * 工具栏构造器
   */
  function Tools (options) {
    this.options = options
    this.toolElem = null
    this.toolbars = [
      { label: '新建', icon: 'icon-text1f', handler: 'canvas:create', type: 'icon' },
      { label: '载入', icon: 'icon-zairu', handler: 'canvas:load', type: 'icon' },
      { label: '保存', icon: 'icon-save', handler: 'canvas:save', type: 'icon' },
      { label: '清除', icon: 'icon-clear-f', handler: 'canvas:clear', type: 'icon' },
      { label: '导出', icon: 'icon-export', handler: 'canvas:export', type: 'icon' },
      { label: '', icon: '', handler: '', type: 'border' },
      { label: '删除', icon: 'icon-delete4', handler: 'shape:delete', type: 'icon' },
      { label: '克隆', icon: 'icon-copy1', handler: 'shape:clone', type: 'icon' },
      { label: '编组', icon: 'icon-zuhe', handler: 'shape:compose', type: 'icon' },
      { label: '拆分', icon: 'icon-jiedianchaifen', handler: 'shape:separate', type: 'icon' },
      { label: '失活', icon: 'icon-warm-active', handler: 'shape:unactive', type: 'icon' },
      { label: '', icon: '', handler: '', type: 'border' },
      { label: '设置动画', icon: 'icon-bim_donghua', handler: 'action:setting', type: 'icon' },
      { label: '播放', icon: 'icon-play', handler: 'action:play', type: 'icon' },
      { label: '停止', icon: 'icon-stop', handler: 'action:stop', type: 'icon' },
    ]
    this.init()
  }

  Tools.prototype = {
    type: 'Tools',
    constructor: Tools,

    init: function () {
      this.toolElem = this.renderToolbar()
      this.options.container.appendChild(this.toolElem)
    },
    
    renderToolbar: function () {
      var toolbarElem = createTag('div', 'draw-toolbar-container')
      var _s = this
      this.toolbars.forEach(function (tool) {
        var isIcon = tool.type === 'icon'
        if (isIcon) {
          var toolElem = createTag('div', 'draw-toolbar-item')
          var iconElem = createTag('span', `draw-toolbar-icon iconfont ${tool.icon}`)
          toolElem.setAttribute('title', tool.label)
          toolElem.appendChild(iconElem)

          toolElem.addEventListener('click', function () {
            _s.handlerEvent(tool.handler)
          })
          
          toolbarElem.appendChild(toolElem)
        } else {
          var borderElem = createTag('div', 'draw-toolbar-border')
          toolbarElem.appendChild(borderElem)
        }
      })
      
      return toolbarElem
    },

    handlerEvent (type) {
      this.options.barClick(type)
    }
  }

  /**
   * 演播构造器
   */
  function Play (options) {
    this.options = options
    this.visible = false
    this.shape = null
    this.start = false
    this.container = null
    this.animateCount = 0
    this.isAbort = false
    this.pathType = false
    this.shapeScrollTop = 0
    this.typeList = [
      {
        id: 1,
        label: '路径',
        icon: 'icon-lujing',
        property: 'path',
        keys: 'left,top',
        needSetCoords: true,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration,
            points = options.points
          
          if (!points.length) {
            clearTimeout(timer)
            this.handleAnimateSubCount()            
            return
          }

          var shapes = Array.isArray(shape) ? shape : [shape]
          var _g = this.options.canvas
          var _s = this
          var trails = this.renderTrails(points, duration)
          //
          shapes.forEach(function (item) {
            var offsetX = Math.floor(item.width / 2)
            var offsetY = Math.floor(item.height / 2)
            var firstPoint = points[0]

            // 渲染初始位置
            item.visible = true
            var left = Math.floor(firstPoint.x - offsetX)
            var top = Math.floor(firstPoint.y - offsetY)
            item.set('left', parseInt(left, 10)).setCoords()
            item.set('top', parseInt(top, 10)).setCoords()
            _g.renderAll()

            //
            var nextTrails = JSON.parse(JSON.stringify(trails))
            var count = 0
            
            function renderAnimate () {
              var trail = nextTrails[count]
              if (!trail) {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
                return
              }

              var end = trail.end,
                duration = trail.duration
              
              ++count

              item.animate({ left: end.x - offsetX, top: end.y - offsetY }, {
                duration: duration,
                onChange: _g.renderAll.bind(_g),
                easing: function (t, b, c, d) { return c*t/d + b; },
                onComplete: function () {
                  renderAnimate()
                },
                abort: function () {
                  return _s.isAbort
                }
              })
            }

            renderAnimate()
          })
        }
      },
      {
        id: 2,
        label: '显示',
        icon: 'icon-visible',
        property: 'visible',
        needSetCoords: false,
        handler: function (options) {
          var shape = options.shape,
              timer = options.timer
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _g = this.options.canvas
          var _s = this
          shapes.forEach(function (item) {
            item.visible = true
            _g.renderAll()
          })
          clearTimeout(timer)
          _s.handleAnimateSubCount()
        },
      },
      {
        id: 3,
        label: '隐藏',
        icon: 'icon-invisible',
        property: 'visible',
        needSetCoords: false,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration
          
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _g = this.options.canvas
          var _s = this
          shapes.forEach(function (item) {
            item.visible = false
            _g.renderAll()
          })
          clearTimeout(timer)
          _s.handleAnimateSubCount()
        },
      },
      {
        id: 4,
        label: '渐入',
        icon: 'icon-qianjin',
        property: 'opacity',
        needSetCoords: false,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration          
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _g = this.options.canvas
          var _s = this
          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 0
            item.animate('opacity', 1, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }
            })
          })
        },
      },
      {
        id: 5,
        label: '渐出',
        icon: 'icon-houtui',
        property: 'opacity',
        needSetCoords: false,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration  
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _s = this
          var _g = this.options.canvas

          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 1
            item.animate('opacity', 0, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }              
            })
          })
        },        
      },
      // {
      //   id: 6,
      //   label: '闪烁',
      //   icon: 'icon-shanshuo',
      //   property: 'opacity',
      //   needSetCoords: true,
      //   handler: function (options) {
      //     var shape = options.shape,
      //       timer = options.timer,
      //       duration = options.duration          

      //   }
      // },
      {
        id: 7,
        label: '缩放',
        icon: 'icon-scale',
        property: 'scale',
        keys: 'scaleX,scaleY',
        needSetCoords: true,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration,
            scale = options.scale
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _s = this
          var _g = this.options.canvas

          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 1
            item.animate({ scaleX: scale, scaleY: scale }, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }              
            })
          })
        }        
      },
      {
        id: 8,
        label: '宽度消失',
        icon: 'icon-column-width',
        property: 'width',
        needSetCoords: true,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration          
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _s = this
          var _g = this.options.canvas

          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 1
            item.animate('width', 0, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }              
            })
          })
        }        
      },
      {
        id: 9,
        label: '高度消失',
        icon: 'icon-colum-height',
        property: 'height',
        needSetCoords: true,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration          
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _s = this
          var _g = this.options.canvas

          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 1
            item.animate('height', 0, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }              
            })
          })
        }        
      },
      {
        id: 10,
        label: '旋转',
        icon: 'icon-rotate-cw',
        property: 'angle',
        needSetCoords: true,
        handler: function (options) {
          var shape = options.shape,
            timer = options.timer,
            duration = options.duration,
            angle = options.angle
          var shapes = Array.isArray(shape) ? shape : [shape]
          var _s = this
          var _g = this.options.canvas

          shapes.forEach(function (item) {
            item.visible = true
            item.opacity = 1
            item.animate('angle', angle, {
              duration: duration,
              onChange: _g.renderAll.bind(_g),
              onComplete: function () {
                clearTimeout(timer)
                _s.handleAnimateSubCount()
              },
              abort: function () {
                return _s.isAbort
              }              
            })
          })
        }        
      },
    ]
    this.init()
  }

  Play.prototype = {
    type: 'Play',
    constructor: Play,

    init: function () {
      var playContainerElem = this.container = createTag('div', 'draw-play-container')
      var shapesElem = createTag('div', 'draw-play-item draw-play-shapes-container')
      var typesElem = createTag('div', 'draw-play-item draw-play-types-container')
      var durationElem = createTag('div', 'draw-play-item draw-play-duration-container')
      var actionElem = createTag('div', 'draw-play-item draw-play-action-container')
      var buttonElem = this.renderPlayButton()
      actionElem.appendChild(buttonElem)
      playContainerElem.appendChild(shapesElem)
      playContainerElem.appendChild(typesElem)
      playContainerElem.appendChild(durationElem)
      playContainerElem.appendChild(actionElem)

      var container = this.options.container 
        ? this.options.container
        : document.body

      container.appendChild(playContainerElem)
    },

    renderTrails: function (points, duration) {
      var ary = [],
        count = points.length - 1,
        i = 0,
        totalLength = 0
      
      for (; i < count; i++) {
        var start = points[i]
        var end = points[i + 1]
        var length = calcLineLength(start, end)
        totalLength += length
        ary.push({
          start: start,
          end: end,
          length: length
        })
      }

      ary.forEach(function (item) {
        item.duration = Math.floor(duration * item.length / totalLength)
      })

      return ary
    },

    clear: function () {
      this.shape = null
    },

    show: function (data) {
      this.visible = true
      this.container.style.display = 'flex'
      this.update(data)
    },

    hide: function () {
      this.visible = false
      this.shapeScrollTop = 0
      this.container.style.display = 'none'
    },

    update: function (data, delShapeIds) {
      // 处理主动删除图形 删除对应的animations
      if (delShapeIds) {
        var curShape = this.shape && this.shape.shapeId
        if (delShapeIds.includes(curShape)) {
          this.shape = null
          this.options.deleteDrawPath()
        }
      }

      this.updateShapes(data)
      this.updateTypes()
      this.updateDuration()
    },

    updateShapes: function (data) {
      var domShapesElem = document.querySelector('.draw-play-shapes-container')
      var shapesElem = this.renderShapesAnimation(data)
      domShapesElem.innerHTML = ''
      domShapesElem.appendChild(shapesElem)
      
      var con = domShapesElem.querySelector('.draw-play-container-content')
      con.scrollTo(0, this.shapeScrollTop)
    },

    updateTypes: function () {
      var domTyesElem = document.querySelector('.draw-play-types-container')
      var typesElem = this.renderAnimationTypes()
      domTyesElem.innerHTML = ''
      domTyesElem.appendChild(typesElem)
    },

    updateDuration: function () {
      var domDurationElem = document.querySelector('.draw-play-duration-container')
      var durationElem = this.renderAnimationDuration()
      domDurationElem.innerHTML = ''
      domDurationElem.appendChild(durationElem)
    },

    renderShapesAnimation: function (data) {
      var fragment = document.createDocumentFragment()
      var titleElem = this.renderTitle('动画元素', true)
      var contentElem = createTag('div', 'draw-play-container-content')
      var _s = this
      data.forEach(function (item, index) {
        var shape = item.shape.shape
        var itemElem = createTag('div', 'draw-play-shape-item')
        if (_s.shape && item.id === _s.shape.id) {
          itemElem.classList.add('active')
        }
        var isGroup = item.shape.type === 'group'
        var indexElem = createTag('div', 'draw-play-shape-item-index')
        indexElem.innerHTML = index + 1
        itemElem.appendChild(indexElem)
        
        var imgElem = createTag('img', 'draw-play-shape-item-img')
        imgElem.src = isGroup? globalConfig.groupIcon : shape.thumbnail
        itemElem.appendChild(imgElem)
        
        var labelElem = createTag('span', 'draw-play-shape-item-label')
        labelElem.innerHTML = isGroup ? '合并分组' : shape.label
        itemElem.appendChild(labelElem)

        var delBtnElem = createTag('span', 'iconfont draw-play-shape-item-delete icon-delete')
        itemElem.appendChild(delBtnElem)
        delBtnElem.addEventListener('click', function (e) {
          e.stopPropagation()
          if (_s.shape && _s.shape.id === item.id) {
            _s.shape = null
          }
          _s.options.observer.trigger('delete:animateShape', item)
        })

        itemElem.addEventListener('click', function (e) {
          var allItems = document.querySelectorAll('.draw-play-shape-item')
          allItems.forEach(function (elem) {
            elem.classList.remove('active')
          })
          e.currentTarget.classList.add('active')
          _s.shape = item
          _s.updateTypes()
          _s.updateDuration()

          _s.options.canvas.setActiveObject(_s.shape.shape)
          _s.options.canvas.renderAll()
        })

        contentElem.appendChild(itemElem)
      })

      // 设置滚动高度
      contentElem.addEventListener('scroll', function (ev) {
        _s.shapeScrollTop = ev.target.scrollTop
      })

      if (!data.length) {
        var emptyElem = this.renderEmpty('暂无内容')
        contentElem.appendChild(emptyElem)
        contentElem.classList.add('empty')
      }
      
      fragment.appendChild(titleElem)
      fragment.appendChild(contentElem)

      return fragment
    },

    renderAnimationTypes: function () {
      var fragment = document.createDocumentFragment()
      var titleElem = this.renderTitle('动画类型')
      var contentElem = createTag('div', 'draw-play-container-content')
      var _s = this

      if (this.shape != null) {
        var shapesElem = createTag('div', 'draw-play-cat-container')
        

        this.typeList.forEach(function (item) {
          var itemElem = createTag('div', 'draw-play-type-item')
          var iconElem = createTag('div', 'iconfont draw-play-type-item-icon ' + item.icon)
          var labelElem = createTag('div', 'draw-play-type-item-label')
          labelElem.innerHTML = item.label
          itemElem.appendChild(iconElem)
          itemElem.appendChild(labelElem)
          if (_s.shape && item.id === _s.shape.animationType) {
            itemElem.classList.add('active')
          }
  
          itemElem.addEventListener('click', function (ev) {
            var itemElems = document.querySelectorAll('.draw-play-type-item')
            var pathBtnGroup = document.querySelector('.draw-play-paths-container')

            if (pathBtnGroup) {
              pathBtnGroup.style.display = 'none'
            }
            
            itemElems.forEach(function (elem) {
              elem.classList.remove('active')
            })
            ev.currentTarget.classList.add('active')
            _s.handleChangeAnimationType(item.id)
            _s.options.fakeRemoveDrawPath()
            
            if (item.id === 1) {
              if (pathBtnGroup) {
                pathBtnGroup.style.display = 'flex'
              } else {
                var pathsElem = _s.renderPathButtons()
                contentElem.appendChild(pathsElem)
              }
              _s.options.renderPolyline(_s.shape.points)
            }

            _s.updateDuration()
          })
          
          shapesElem.appendChild(itemElem)
        })
        contentElem.appendChild(shapesElem)
        
        if (_s.shape && _s.shape.animationType === 1) {
          var pathsElem = this.renderPathButtons()
          contentElem.appendChild(pathsElem)
          _s.options.renderPolyline(_s.shape.points)
        }

        
      } else {
        var emptyElem = this.renderEmpty('暂无内容')
        contentElem.appendChild(emptyElem)
        contentElem.classList.add('empty')
      }
      
      fragment.appendChild(titleElem)
      fragment.appendChild(contentElem)

      return fragment
    },

    renderPathButtons: function () {
      var _s = this
      var pathsElem = createTag('div', 'draw-play-paths-container')
      // 添加路径操作按钮
      var btn1 = createTag('button', 'draw-play-paths-button primary')
      var btn2 = createTag('button', 'draw-play-paths-button success')
      var btn3 = createTag('button', 'draw-play-paths-button wraning')
      var btn4 = createTag('button', 'draw-play-paths-button info')
      btn1.innerHTML = '绘制路径'
      btn2.innerHTML = '完成绘制'
      btn3.innerHTML = '删除路径'
      btn4.innerHTML = '显隐路径'
      pathsElem.appendChild(btn1)
      pathsElem.appendChild(btn2)
      pathsElem.appendChild(btn3)
      pathsElem.appendChild(btn4)

      // 完成
      btn1.onclick = function () {
        _s.options.startDrawPath()
        _s.isPathType = true
      }

      // 完成
      btn2.onclick = function () {
        _s.options.completeDrawPath()
      }

      // 删除
      btn3.onclick = function () {
        _s.options.deleteDrawPath()
      }

      // 切换显示隐藏
      btn4.onclick = function () {
        _s.options.toggleDrawPath()
      }
      return pathsElem
    },

    renderAnimationDuration: function () {
      var fragment = document.createDocumentFragment()
      var titleElem = this.renderTitle('参数配置')
      var contentElem = createTag('div', 'draw-play-container-content')

      if (this.shape != null) {
        var startElem = this.renderConfigInput('开始时间', 'startTime', 0, 'ms')
        var endElem = this.renderConfigInput('结束时间', 'endTime', 0, 'ms')
        // 缩放
        if (this.shape.animationType === 7) {
          var scaleElem = this.renderConfigInput('缩放比例', 'scale', 1, '')
          contentElem.appendChild(scaleElem)
        }

        // 旋转
        if (this.shape.animationType === 10) {
          var angleElem = this.renderConfigInput('旋转角度', 'angle', 0, '°')
          contentElem.appendChild(angleElem)
        }
        contentElem.appendChild(startElem)
        contentElem.appendChild(endElem)
      } else {
        var emptyElem = this.renderEmpty('暂无内容')
        contentElem.appendChild(emptyElem)
        contentElem.classList.add('empty')
      }

      fragment.appendChild(titleElem)
      fragment.appendChild(contentElem)

      return fragment
    },

    renderConfigInput: function (label, key, defaultValue, unit) {
      var _s = this
      var value = this.shape
        ? this.shape[key] || defaultValue
        : defaultValue

      var itemElem = createTag('div', 'draw-play-duration-item')
      var labelElem = createTag('span', 'draw-play-duration-item-label')
      labelElem.innerHTML = label
      var inputElem = createTag('input', 'draw-play-duration-input')
      inputElem.setAttribute('type', 'number')
      inputElem.value = value

      var unitElem = createTag('span', 'draw-play-duration-unit')
      unitElem.innerHTML = unit || ''

      inputElem.addEventListener('change', function (ev) {
        _s.shape[key] = ev.currentTarget.value
        _s.options.observer.trigger('update:animateShape', _s.shape, true)
      })

      itemElem.appendChild(labelElem)
      itemElem.appendChild(inputElem)
      itemElem.appendChild(unitElem)

      return itemElem
    },

    renderPlayButton: function () {
      var fragment = document.createDocumentFragment()
      var titleElem = this.renderTitle('操作')
      var contentElem = createTag('div', 'draw-play-container-content column')

      var playOuterElem = createTag('div', 'draw-play-button-outer')
      var playElem = createTag('span', 'iconfont draw-play-button icon-play')
      var playLeblElem = createTag('span', 'draw-play-button-label')
      playLeblElem.innerHTML = '预览'
      playOuterElem.appendChild(playElem)
      playOuterElem.appendChild(playLeblElem)
      
      var stopOuterElem = createTag('div', 'draw-play-button-outer')
      var stopElem = createTag('span', 'iconfont draw-play-button icon-stop')
      var stopLeblElem = createTag('span', 'draw-play-button-label')
      stopLeblElem.innerHTML = '停止'
      stopOuterElem.appendChild(stopElem)
      stopOuterElem.appendChild(stopLeblElem)

      var _s = this
      playElem.title = '预览'
      stopElem.title = '停止'

      playOuterElem.addEventListener('click', function () {
        if (_s.start) return
        playElem.setAttribute('disabled', true)
        _s.handleAnimationPlay()
        
      })

      stopOuterElem.addEventListener('click', function () {
        _s.handleAnimationStop()

      })

      contentElem.appendChild(playOuterElem)
      contentElem.appendChild(stopOuterElem)

      fragment.appendChild(titleElem)
      fragment.appendChild(contentElem)
      return fragment
    },

    renderTitle: function (title, isTitle) {
      var titleElem = createTag('div', 'draw-play-container-title')
      var labelElem = createTag('div', 'draw-play-container-title-label') 
      var _s = this
      labelElem.innerHTML = title

      if (isTitle) {
        var addElem = createTag('span', 'draw-play-container-title-add iconfont icon-new')
        titleElem.appendChild(addElem)
        addElem.addEventListener('click', function () {
          _s.handleAddAnimation()
        })
        titleElem.appendChild(addElem)
      }
      
      titleElem.appendChild(labelElem)
      return titleElem
    },

    renderEmpty: function (content) {
      var emptyElem = createTag('div', 'draw-play-container-content-empty')
      emptyElem.innerHTML = content
      return emptyElem
    },

    handleChangeAnimationType: function (id) {
      var nextId = id === this.shape.animationType ? null : id
      this.shape.animationType = nextId
      this.options.observer.trigger('update:animateShape', this.shape, true)
    },

    // 添加动画
    handleAddAnimation: function () {
      var obj = this.options.canvas.getActiveObjects()
      if (!obj.length) {
        return showMessage('请先选中元素后再添加', 'warning')
      }
      
      this.shape = {
        id: uuid(),
        animationType: null,
        startTime: 0,
        endTime: 0,
        points: [],
        shape: obj[0],
        shapeId: obj[0].shapeId
      }
      this.options.observer.trigger('update:animateShape', this.shape)
    },

    // 开始动画
    handleAnimationPlay: function () {
      var file = this.options.getFile()
      var animations = file ? file.animations : []
      var _s = this
      this.playTimer = {}
      this.options.fakeRemoveDrawPath()
      this.options.canvas.discardActiveObject()
      var isStart = false
      
      animations.forEach(function (ani, index) {
        if (ani.animationType != null) {
          var typeObj = _s.typeList.find(function (item) {
            return item.id === ani.animationType
          })
          if (!typeObj) {
            return console.log('暂无对应动画类型')
          }

          isStart = true
          _s.handleAnimatePlusCount()
          var timer = setTimeout(function () {
            var duration = ani.endTime - ani.startTime
            duration = Math.max(0, duration)
            var options = {
              shape: ani.shape,
              timer: timer,
              duration: duration,
              points: ani.points,
              scale: ani.scale,
              angle: ani.angle
            }
            typeObj.handler.call(_s, options)
          }, ani.startTime)

          var originalValue = {}

          if (typeof typeObj.keys === 'string') {
            var keys = typeObj.keys.split(',')
            keys.forEach(function (key) {
              originalValue[key] = ani.shape[key]
            })
          } else {
            originalValue = {
              [typeObj.property]: ani.shape[typeObj.property]
            }
          }

          _s.playTimer[index] = {
            timer: timer,
            shape: ani.shape,
            originalValue: originalValue,
            needSetCoords: typeObj.needSetCoords
          }
        }
      })
      this.start = isStart
      console.log('启动', this.start)
    },

    handleAnimationReset: function () {
      var _s = this
      var keys = Object.keys(this.playTimer)

      keys.forEach(function (key) {
        var cur = _s.playTimer[key]
        var valObj = cur.originalValue
        var shape = cur.shape
        
        Object.keys(valObj).forEach(function (item) {
          // path特殊处理
          if (cur.needSetCoords) {
            shape.set(item, parseInt(valObj[item], 10)).setCoords()
          } else {
            shape.set(item, valObj[item])
          }
        })
      })
      
      this.options.canvas.renderAll()
    },

    handleAnimationStop: function () {
      if (!this.start) return
      this.isAbort = true
      var _s = this
      showMessage('演播停止', 'warning')
      var keys = Object.keys(this.playTimer)
      keys.forEach(function (key) {
        clearTimeout(_s.playTimer[key].timer)
      })
      this.handleAnimationReset()
      this.playTimer = {}
      this.start = false
    },

    handleAnimateSubCount: function () {
      --this.animateCount
      if (this.animateCount === 0) {
        this.handleAnimationReset()
        this.start = false
        if (!this.isAbort) {
          this.options.observer.trigger('play:end')
          showMessage('演播结束', 'success')
        } else {
          this.isAbort = false
        }
      }
    },

    handleAnimatePlusCount: function () {
      ++this.animateCount
    },

    handleDrawPathComplete: function (points) {
      if (this.shape) {
        this.shape.points = points
        this.options.observer.trigger('update:animateShape', this.shape, true)
      }
    },
  }

  /* 工具方法 */

  // 创建标签
  function createTag (tag, className) {
    var elem = document.createElement(tag)
    if (className != null) {
      elem.className = className
    }
    return elem
  }

  // 去除结尾或起始斜线
  function trimSeparator (isStart) {
    var reg = isStart ? /^\/+/ : /\/+$/
    return function (path) {
      return path.replace(reg, '')
    }
  }
  
  // 生成唯一id
  function uuid (len, prefix) {
    len = len || 12
    prefix = prefix || ''
    if (![12, 24, 36].includes(len)) return new Error('长度位数支持12 | 24 | 36')
    const count = 6
    const times = len / count
    const genRandomId = () => Math.random().toString(36).slice(-6)
    let id = ''
    prefix = prefix ? prefix + '-' : ''
  
    for (let i = 0; i < times; i++) {
      id = `${id}-${genRandomId()}`
    }
  
    return prefix + id.slice(1)
  }
  
  /* 消息提示 */
  function showMessage (msg, type) {
    var classList = {
      danger: 'danger',
      info: 'info',
      success: 'success',
      warning: 'warning'
    }
    type = type || 'info'
    
    var msgElem = createTag('div', `draw-message-container ${classList[type]}`)
    msgElem.innerHTML = msg
    document.body.appendChild(msgElem)
    setTimeout(function () {
      msgElem.parentNode.removeChild(msgElem)
    }, 1500)
  }

  /* 显示弹窗 */
  function showDialog (options) {
    var dialogElem = createTag('div', 'draw-dialog')
    var dialogContainerElem = createTag('div', 'draw-dialog-container')
    var headerElem = renderDialogHeader(options)
    var bodyElem = renderDialogBody(options)
    dialogContainerElem.appendChild(headerElem)
    dialogContainerElem.appendChild(bodyElem)
    if (!options.hideFooter) {
      var footerElem = renderDialogFooter(options)
      dialogContainerElem.appendChild(footerElem)
    }
    dialogElem.appendChild(dialogContainerElem)
    dialogElems.push(dialogElem)
    document.body.appendChild(dialogElem)
  }

  function getKeycode (event) {
    var code
    if (event.key !== undefined) {
      code = event.key;
    } else if (event.keyIdentifier !== undefined) {
      code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }
    return code
  }
  
  /* 隐藏弹窗 */
  function hideDialog () {
    var dialog = dialogElems.pop()
    if (dialog) {
      dialog.parentNode.removeChild(dialog)
    }
  }

  function renderDialogHeader (options) {
    var headerElem = createTag('div', 'draw-dialog-header')
    var titleElem = createTag('div', 'draw-dialog-title')
    var closeElem = createTag('span', 'draw-dialog-close iconfont icon-close')
    titleElem.innerHTML = options.title
    closeElem.addEventListener('click', function (e) {
      hideDialog()
      if (typeof options.close === 'function') {
        options.close()
      }
    })
    headerElem.appendChild(titleElem)
    headerElem.appendChild(closeElem)

    return headerElem
  }

  function renderDialogBody (options) {
    var bodyElem = createTag('div', 'draw-dialog-body')
    bodyElem.appendChild(options.context)

    return bodyElem
  }

  function renderDialogFooter (options) {
    var footerElem = createTag('div', 'draw-dialog-footer')
    var confirmBtnElem = createTag('div', 'draw-dialog-button confirm')
    var cancelBtnElem = createTag('div', 'draw-dialog-button cancel')
    confirmBtnElem.innerHTML = '确定'
    cancelBtnElem.innerHTML = '取消'
    footerElem.appendChild(confirmBtnElem)
    footerElem.appendChild(cancelBtnElem)

    confirmBtnElem.addEventListener('click', function () {
      if (typeof options.confirm === 'function') {
        options.confirm()
      }
    })

    cancelBtnElem.addEventListener('click', function () {
      hideDialog()
      if (typeof options.cancel === 'function') {
        options.cancel()
      }
    })

    return footerElem
  }

  function renderFileList (options) {
    var tableElem = createTag('div', 'draw-files-table')
    var headerElem = createTag('div', 'draw-files-table-header')
    var headerInnerElem = renderItem('名称', '日期', '操作', null, false)
    headerElem.appendChild(headerInnerElem)
    tableElem.appendChild(headerElem)

    var bodyElem = createTag('div', 'draw-files-table-body')
    
    if (options.data.length) {
      options.data.forEach(function (json) {
        var bodyItemElem = renderItem(json.name, json.date, '删除', json, true)
        bodyElem.appendChild(bodyItemElem)
      })
    } else {
      var emptyElem = renderEmpty()
      bodyElem.appendChild(emptyElem)
    }
    tableElem.appendChild(bodyElem)

    return tableElem

    function renderEmpty () {
      var emptyElem = createTag('div', 'draw-files-empty')
      emptyElem.innerHTML = '暂无文件'
      return emptyElem
    }

    function renderItem (name, date, action, json, isBody) {
      var centerCellClassName = isBody
        ? 'draw-files-item--cell center'
        : 'draw-files-item--cell'
      var itemElem = createTag('div', 'draw-files-item')
      var nameElem = renderElem(name, 'draw-files-item--cell')
      var dateElem = renderElem(date, centerCellClassName)
      var actionElem = renderElem(action, centerCellClassName)

      if (isBody) {
        actionElem.classList.add('action')
        actionElem.addEventListener('click', function (ev) {
          ev.stopPropagation()
          options.onDelete(json, itemElem, function () {
            var bodyElem = document.querySelector('.draw-files-table-body')
            var emptyElem = renderEmpty()
            bodyElem.appendChild(emptyElem)
          })
        })

        itemElem.addEventListener('click', function () {
          options.onSelect(json)
        })
      }

      itemElem.appendChild(nameElem)
      itemElem.appendChild(dateElem)
      itemElem.appendChild(actionElem)
      return itemElem
    }

    function renderElem (html, className) {
      var elem = createTag('div', className)
      elem.innerHTML = html
      return elem
    }
  }

  function createDate (time) {
    time = time || new Date()
    var year = time.getFullYear()
    var month = formater(time.getMonth() + 1)
    var date = formater(time.getDate() + 1)
    var hour = formater(time.getHours())
    var min = formater(time.getMinutes())
    var second = formater(time.getSeconds())
    return `${year}-${month}-${date} ${hour}:${min}:${second}`
    function formater (number) {
      return `0${number}`.slice(-2)
    }
  }

  function calcLineLength(start, end) {
    var x1 = start.x,
      y1 = start.y,
      x2 = end.x,
      y2 = end.y
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  function Store () {
    this.key = 'DRAW_JSONS'
    this.jsons = []
    this.init()
  }
  Store.prototype = {
    type: 'Store',
    constructor: Store,

    save: function (data) {
      if (!data.id) return

      var findIndex = this.jsons.findIndex(function (item) {
        return item.id === data.id
      })
      
      if (findIndex === -1) {
        this.jsons.push(data)
      } else {
        this.jsons.splice(findIndex, 1, data)
      }

      this.setLocal()
    },

    setLocal: function () {
      localStorage.setItem(this.key, JSON.stringify(this.jsons))
    },

    get: function () {
      return this.jsons
    },

    delete: function (id) {
      var findIndex = this.jsons.findIndex(function (item) {
        return item.id === id
      })
      if (findIndex !== -1) {
        this.jsons.splice(findIndex, 1)
      }
      this.setLocal()
    },

    init: function () {
      var json = localStorage.getItem(this.key)
      if (json != null) {
        this.jsons = JSON.parse(json)
      }
    },
  }
  
})(typeof exports !== 'undefined' ? exports : this)

