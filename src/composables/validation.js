import { ElMessage } from 'element-plus';

export const validateFolderName = (value) => {
    if (!value) {
        ElMessage.warning('请输入输出文件夹名称');
        return false;
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
        ElMessage.warning('文件夹名称只能包含字母、数字、下划线和横线');
        return false;
    }
    return true;
}; 