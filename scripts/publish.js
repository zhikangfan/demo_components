import shell from 'shelljs';
const args = process.argv.slice(2)
const mode = args[0] // 模式： prod：生产环境 test：测试环境
shell.exec(`npm run build:${mode}`)
if (mode === 'prod') {
  shell.exec(
    `rsync -av --progress dist/web root@139.224.205.240:/home/www/ps.yijian.cn/`
  )
} else {
  shell.exec(
    `rsync -av --progress dist/web root@139.224.205.240:/home/imageconvert/imageconvertwww/`
  )
}
