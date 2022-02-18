import pandas as pd
import numpy as np
kk=np.arange(9).reshape(3,3)
dq=pd.DataFrame(data=kk,index=['aa','bb','cc'],columns=['a','b','c'])
data1=pd.read_excel(r'C:\Users\13966\Desktop\douban.xlsx')

# print(dq.sort_values(by='a',ascending=False))
print(dq.info())
d='ssss{}s'.format('q')
