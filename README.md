# 该项目为疫情动态小程序，接口数据略微滞后，数据仅供学习参考 #

## 本项目是用原生小程序 + vant-weapp + echarts做出 ##

### 在echart使用上，做了一些优化 ###

 通过读源码和看实例，进行了优化，做到合适时机的延迟初始化echart——而不是通过定时器

 原本初始化函数放在ec中，那么在组件初始化的时候，判断ec的lazyLoad为false后就会开始初始化

 所以设置lazyLoad为true后，就可手动初始化——监听父组件给子组件传来的省份数据，在获取到后，开始初始化，通过selectComponent获取到子组件实例后，调用其init方法，该方法传callback


- callback中先是一个对echart宽度、高度、dpr等设置的固定写法，返回chart
- 画布插入该chart，然后注册地图
- 接着设置option，option根据需要修改
- 最后一定返回chart

这个就是大致过程，具体看代码