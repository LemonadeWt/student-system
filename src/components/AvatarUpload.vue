<template>
    <el-upload class="avatar-uploader" action="http://47.98.128.191:3000/images/uploadImages" ref="avatarUpload"
        :multiple="false" list-type="text" :file-list="fileList" :on-success="handleAvatarSuccess" :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload">
        <img v-if="imagePath" :src="imagePath" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    props: {
        imgPath: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            imagePath: '',
            fileList: []
        }
    },
    // computed:{
    //     imagePath:{
    //         get(){
    //             return this.imgPath
    //         },
    //         set(val){

    //         }
    //     }
    // },
    created() {
        console.log("created");

    },
    watch: {
        //监听父组件传过来的图片路径，首次过来需要加载图片
        imgPath(newVal, oldVal) {
            // console.log("watch",newVal);
            // console.log("watch",oldVal);
            if(!oldVal){
                //学生数据没有头像照片，上传组件也不显示名字
                this.fileList.push({name: '数据库存的名字.png' });
                // console.log("filelist",this.fileList);
            };
            this.imagePath = newVal;
        }
    },
    methods: {
        handleAvatarSuccess(res, file, fileList) {
            // console.log(res);
            // console.log(file);
            console.log(fileList);

            // this.imagePath = URL.createObjectURL(file.raw);
            //在选择好图片后点击确定即表示已经上传到服务器，此时需要保存文件上传的位置路径，用于保存到数据库
            if (res.code) {
                this.imagePath = res.data[0];
                this.$emit('setImagePath', this.imagePath);
                //图片下方显示的文件名字只要上传成功就只能取最新的一个
                this.fileList = fileList.slice(-1)

                // //对象新增属性和删除，无法监听，使用下面的方法才有效
                // this.$set(this.students, 'imagePath',res.data[0])
                // //this.students.imagePath = res.data[0],该方法无效，页面监听不到
            } else {
                this.$message.error('头像上传失败');
            }

        },
        beforeAvatarUpload(file) {
            //上传之前控制文件格式和大小
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
            //清空图片区域
            this.imagePath = '';
            // this.$refs['avatarUpload'].clearFiles();
        },

    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep {
    .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;

        &:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 24px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>