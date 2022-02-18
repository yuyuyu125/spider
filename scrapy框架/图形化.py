from tkinter import *
def run1():
    name=inp1.get()
    txt.insert(END,name)
    inp1.delete(0,END)

root=Tk()
root.title('自动下载电影')
root.geometry('460x240')
lb1=Label(root,text='请输入电影名字')
lb1.place(relx=0.1,rely=0.1,relwidth=0.8,relheight=0.1)
inp1=Entry(root)
inp1.place(relx=0.1,rely=0.2,relwidth=0.4,relheight=0.1)
btn1=Button(root,text='搜索',command=run1)
btn1.place(relx=0.1, rely=0.4, relwidth=0.3, relheight=0.1)
txt = Text(root)
txt.place(rely=0.6,relheight=0.4)
root.mainloop()