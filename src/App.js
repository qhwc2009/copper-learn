import React, { Component } from 'react'

import ClassCropperModal from './ClassCropperModal/ClassCropperModal'
import HooksCropperModal from './HooksCropperModal/HooksCropperModal'

import './App.scss'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classModalVisible: false,
      hooksModalVisible: false,

      classModalFile: null,
      hooksModalFile: null,

      classResultImgUrl: null,
      hooksResultImgUrl: null
    }
  }

  handleClassFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        this.setState(
          {
            classModalFile: file // 先把上传的文件暂存在state中
          },
          () => {
            this.setState({
              classModalVisible: true // 然后弹出modal
            })
          }
        )
      } else {
        console.log('文件过大')
      }
    }
  }

  handleHooksFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        this.setState(
          {
            hooksModalFile: file // 先把上传的文件暂存在state中
          },
          () => {
            this.setState({
              hooksModalVisible: true // 然后弹出modal
            })
          }
        )
      } else {
        console.log('文件过大')
      }
    }
  }

  handleGetResultImgUrl = key => blob => {
    const str = URL.createObjectURL(blob)
    this.setState({
      [key]: str
    })
  }

  render() {
    const {
      classModalVisible,
      classModalFile,
      hooksModalVisible,
      hooksModalFile,
      classResultImgUrl,
      hooksResultImgUrl
    } = this.state
    return (
      <div className="app">
        <div className="half-area">
          <label className="upload-input-label">
            <span>(class形式的component)添加图片</span>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="base-upload-input"
              onChange={this.handleClassFileChange}
            />
          </label>
          <div className="img-container">
            {classResultImgUrl && (
              <img
                className="img"
                src={classResultImgUrl}
                alt="classResultImgUrl"
              />
            )}
          </div>
        </div>
        <div className="half-area">
          <label className="upload-input-label">
            <span>(hooks形式的component)添加图片</span>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="base-upload-input"
              onChange={this.handleHooksFileChange}
            />
          </label>
          <div className="img-container">
            {hooksResultImgUrl && (
              <img
                className="img"
                src={hooksResultImgUrl}
                alt="classResultImgUrl"
              />
            )}
          </div>
        </div>

        {classModalVisible && (
          <ClassCropperModal
            uploadedImageFile={classModalFile}
            onClose={() => {
              this.setState({ classModalVisible: false })
            }}
            onSubmit={this.handleGetResultImgUrl('classResultImgUrl')}
          />
        )}

        {hooksModalVisible && (
          <HooksCropperModal
            uploadedImageFile={hooksModalFile}
            onClose={() => {
              this.setState({ hooksModalVisible: false })
            }}
            onSubmit={this.handleGetResultImgUrl('hooksResultImgUrl')}
          />
        )}
      </div>
    )
  }
}

export default App
