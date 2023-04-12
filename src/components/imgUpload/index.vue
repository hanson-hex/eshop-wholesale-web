<template>
  <div class="uploadWrapper">
    <vuedraggable v-model="imgList"
                  class="vue-draggable"
                  :class="{ single: isSingle, maxHidden: isMaxHidden }"
                  tag="ul"
                  draggable=".draggable-item"
                  @start="onDragStart"
                  @end="onDragEnd">
      <!-- 拖拽元素 -->
      <li v-for="(item, index) in imgList"
          :key="item + index"
          class="draggable-item"
          :style="{ width: width + 'px', height: height + 'px' }">
        <el-image :src="item"
                  :preview-src-list="[item]" />
        <div v-if="!isEdit"
             class="shadow"
             @click="onRemoveHandler(index)">
          <i class="el-icon-delete" />
        </div>
      </li>
      <!-- 上传按钮 -->
      <el-upload v-show="!isEdit"
                 slot="footer"
                 ref="uploadRef"
                 class="uploadBox"
                 :disabled="isEdit"
                 :style="{ width: width + 'px', height: height + 'px' }"
                 :action="action"
                 accept=".jpg,.jpeg,.png,.gif"
                 :show-file-list="false"
                 :multiple="!isSingle"
                 :limit="limit"
                 :before-upload="beforeUpload"
                 :headers="headers"
                 :on-success="onSuccessUpload"
                 :on-exceed="onExceed"
                 :on-error="onError">
        <i class="el-icon-plus uploadIcon">
          <span v-show="isUploading"
                class="uploading">正在上传...</span>
          <span v-if="!isUploading && limit && limit !== 99 && !isSingle"
                class="limitTxt">最多{{ limit }}张</span>
        </i>
      </el-upload>
    </vuedraggable>
    <!-- <template> -->
    <slot name="tip" />
    <!-- </template> -->
    <!-- <p v-if="!isEdit" slot="tip" class="el-upload__tip">
      图片格式为jpg或png，建议尺寸800*800，图片大小不得超过5M
    </p> -->
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { getToken } from "@/utils/auth";

export default {
  name: 'ImgUpload',
  components: { vuedraggable },
  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    value: {
      type: Array,
      default () {
        return []
      }
    },
    isEdit: {
      // 是否能编辑
      type: Boolean,
      default: false
    },
    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 99
    },
    // 限制上传图片的文件大小(kb)
    size: {
      type: Number,
      default: 500
    },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 100
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      action: 'https://gateway.cbyyk.com/product/goodsbase/upload',
      // action: 'https://gateway.cbyyk.com' + '/product/goodsbase/upload',
      fileLength: 0, // 记录多张上传的状态
      isUploading: false, // 正在上传状态
      isFirstMount: true // 控制防止重复回显
    }
  },

  computed: {
    headers: function () {
      return {
        Authorization: 'Bearer ' + getToken(),
      }
    },
    // 图片数组数据
    imgList: {
      get () {
        return this.value
      },
      set (val) {
        if (val.length < this.imgList.length) {
          // 判断是删除图片时同步el-upload数据
          this.syncElUpload(val)
        }
        // 同步v-model
        this.$emit('input', val)
      }
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden () {
      return this.imgList.length >= this.limit
    }
  },
  watch: {
    value: {
      handler (val) {
        console.log('开始')
        if (this.isFirstMount && this.value.length > 0) {
          this.syncElUpload(val)
        } else if (this.value.length === 0) {
          this.fileLength = 0
          this.$refs.uploadRef.clearFiles()
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.value.length > 0) {
      this.syncElUpload()
    }
  },

  methods: {
    // 同步el-upload数据
    syncElUpload (val) {
      const imgList = val || this.imgList
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        return {
          name: 'pic' + i,
          url: v,
          status: 'success'
        }
      })
      this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload (file) {
      this.isFirstMount = false
      if (file.type.indexOf('image') < 0) {
        this.$message.error('上传格式错误')
        if (file.size / 1024 / 1024 > 5) {
          this.$message.error('图片需小于5M')
        }
        return false
      }
      this.isUploading = true
    },
    // 上传完单张图片
    onSuccessUpload (res, file, fileList) {
      this.fileLength++
      // 这里需要根据你自己的接口返回数据格式和层级来自行修改
      if (res.data) {
        // 判断接口上传成功
        if (this.imgList.length < this.limit) {
          // 未超限时，把接口返回的图片url地址添加到imgList
          this.imgList.push(res.data.url)
        }
      } else {
        // 判断接口上传失败
        this.syncElUpload()
        this.$refs.uploadRef.clearFiles()
        this.$message({ type: 'error', message: res.msg })
      }
      if (this.fileLength === fileList.length) {
        this.isUploading = false
      }
    },
    // 上传图片失败
    onError (err, file, fileList) {
      const data = JSON.parse(JSON.stringify(err))
      // eslint-disable-next-line eqeqeq
      if (data.status != 200) {
        this.fileLength = 0
        this.$refs.uploadRef.clearFiles()
        this.$message.error('上传失败')
      }
      this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler (index) {
      this.$confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fileLength = 0
          this.imgList = this.imgList.filter((v, i) => {
            return i !== index
          })
          this.$refs.uploadRef.clearFiles()
        })
        .catch(() => {
          this.fileLength = 0
          this.$refs.uploadRef.clearFiles()
        })
    },
    // 超限
    onExceed (files, fileList) {
      this.$refs.uploadRef.abort() // 取消剩余接口请求
      this.syncElUpload()
      this.$message({
        type: 'warning',
        message: `图片超限，最多可上传${this.limit}张图片`
      })
      this.isUploading = false
    },
    onDragStart (e) {
      e.target.classList.add('hideShadow')
    },
    onDragEnd (e) {
      e.target.classList.remove('hideShadow')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  width: 100%;
  height: 100%;
}

// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}

// 拖拽
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }
  &.single {
    overflow: hidden;
    position: relative;

    .draggable-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  &.maxHidden {
    .uploadBox {
      display: none;
    }
  }
}
// el-image
.el-image-viewer__wrapper {
  .el-image-viewer__mask {
    opacity: 0.8;
  }
  .el-icon-circle-close {
    color: #fff;
  }
}
</style>
