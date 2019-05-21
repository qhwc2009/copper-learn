import React, { Component } from 'react'

import ClassCropperModal from './ClassCropperModal/ClassCropperModal'

import './App.scss'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      classModalVisible: false,
      hooksModalVisible: false,

      classModalFile: null,
      hooksModalFile: null
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

  handleHooksFileChange = e => {}

  render() {
    const { classModalVisible, classModalFile } = this.state
    return (
      <div className="app">
        <div className="half-area">
          <label className="upload-input-label">
            <span>(class形式的conponent)添加图片</span>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="base-upload-input"
              onChange={this.handleClassFileChange}
            />
          </label>
        </div>
        <div className="half-area">
          <label className="upload-input-label">
            <span>(hooks形式的conponent)添加图片</span>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="base-upload-input"
              onChange={this.handleHooksFileChange}
            />
          </label>
        </div>

        {classModalVisible && (
          <ClassCropperModal
            uploadedImageFile={classModalFile}
            onClose={() => {
              this.setState({ classModalVisible: false })
            }}
          />
        )}
      </div>
    )
  }
}

export default App
