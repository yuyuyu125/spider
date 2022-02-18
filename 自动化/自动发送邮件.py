import smtplib
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
from email.mime.image import MIMEImage
host_server='smtp.qq.com' #smtp服务器地址
sender_sina='1396641320@qq.com'#邮箱
pwd='zljjshmpuiaeheea' #密码

re_sina='kuaile19991@163.com'#收信人邮箱kuaile19991@163.com
mail_title='男朋友自动发的邮件'
mail_content='喜欢你' #邮件正文
msg=MIMEMultipart('related')
msg['Subject']=Header(mail_title,'utf-8')
msg['From']=sender_sina
msg['To']=Header('美女')
#添加图片
image_data=open('C:/Users/13966/Desktop/meinv.jpg','rb')
message_image=MIMEImage(image_data.read())
image_data.close()
message_image.add_header('Content-ID','<iamge1>')
message_image['Content-Type']='application/octet-stream'
message_image.add_header('Content-Disposition','attachment',filename='美女.jpg') #中文
#message_image['Content-Disposition']='attachment;filename="meinv.jpg"'  英文状态
msg.attach(message_image)
#添加附件
douban=MIMEText(open(r'C:/Users/13966/Desktop/douban.xlsx','rb').read(),'base64','utf-8')
#添加附件信息
douban['Content-Type']='application/octet-stream'
douban.add_header('Content-Disposition','attachment',filename='豆瓣TOP250.xlsx')
msg.attach(douban)
msg.attach(MIMEText(mail_content,'plain','utf-8')) #邮件主题 html可以带附件
smtp=SMTP_SSL(host_server)
smtp.connect(host_server,465)
smtp.login(sender_sina,pwd)
smtp.sendmail(sender_sina,re_sina,msg.as_string())
print('发送成功')
smtp.quit()