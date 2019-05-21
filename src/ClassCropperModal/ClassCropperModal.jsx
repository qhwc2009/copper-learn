import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Cropper from 'react-cropper' // 引入Cropper
import 'cropperjs/dist/cropper.css' // 引入Cropper对应的css

import './ClassCropperModal.scss'

export default class ClassCropperModal extends Component {
  static propTypes = {
    uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      src: null
    }
  }

  componentDidMount() {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const dataURL = e.target.result
      this.setState({ src: dataURL })
    }

    fileReader.readAsDataURL(this.props.uploadedImageFile)
  }

  handleSubmit = () => {
    if (!this.state.submitting) {
      // let url = `/homepage_images` // 你要上传的url
      // 拿到文件名
      let filename = this.props.uploadedImageFile.name

      console.log('正在上传图片')
      // TODO: 这里可以尝试修改上传图片的尺寸
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 创造提交表单数据对象
        const formData = new FormData()
        // 添加要上传的文件
        formData.append('file', blob, filename)
        // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
        // this.setState({submitting: true})
        // 上传图片
        // const resp = await http.post(url, formData)
        // 拿到服务器返回的数据(resp)
        // console.log(resp)
        // 提示上传完毕
        // this.setState({submitting: false})
        // 关闭弹窗
        this.props.onClose()
      })
    }
  }

  render() {
    return (
      <div className="class-cropper-modal">
        <div className="modal-panel">
          <div className="cropper-container-container">
            <div className="cropper-container">
              <Cropper
                src={this.state.src}
                className="cropper"
                ref={cropper => (this.cropper = cropper)}
                // Cropper.js options
                viewMode={1}
                zoomable={false}
                aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                guides={false}
                preview=".cropper-preview"
              />
            </div>
            <div className="preview-container">
              <div className="cropper-preview" />
            </div>
          </div>
          <div className="button-row">
            <div className="submit-button" onClick={this.handleSubmit}>
              点击提交
            </div>
          </div>
        </div>
      </div>
    )
  }
}
