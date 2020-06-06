import * as echarts from '../../components/ec-canvas/echarts';
import geoJson from './china';
import {GetProvinceStatsData} from '../../api/index'

// 为了能获取到chart实例，所以在函数外先定义
let chart = null;

function initChart(canvas, width, height, dpr) {
  // 这个不用管，固定写法
  chart = echarts.init(canvas, null, {
    width:width,
    height:height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  // 注册地图
  echarts.registerMap('china',geoJson)
  // chart.setOption(option);
  return chart;
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    provinceData:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart,
      isLoadingMap:false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  },

  ready: async function() { 
    // 数据比较旧
    clearTimeout(timeout)
    const timeout = setTimeout(()=>{
      // console.log(this.data.provinceData);
      // const result = await GetProvinceStatsData()
      const data = this.data.provinceData.map((item,index) => {
        return {
          name:item.provinceShortName,
          value:item.currentConfirmedCount
        }
      })
        // 地图内容配置
      const option = {
        // backgroundColor:"#F3F1F0",
        // 提示框组件
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
    
        // 视觉映射组件
        visualMap: {
          type:"piecewise",
          itemGap:0,
          pieces:[
            {value:0,color:"#eee"},
            {min:1,max: 10 , color:'#F7E390'},
             // 不指定 max，表示 max 为无限大（Infinity）。
             {min: 10, max: 200 , color:'#FADC5D'},
             {min: 200, max: 300 , color:"#FAD146"},
             {min: 300, max: 1000 , color:"#EA8D3D"},
            {min: 1000, max: 1500 , color:"#F35533"},
            {min: 1500,color:"#D4123F"},
          ],
          showLabel:true,
          left: 'left',
          bottom: '0',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        // 工具栏
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
              restore: {},
          }
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          top:"10",
          type: 'map',  //类型是地图，用于地理数据可视化
          mapType: 'china', //注册的地图
          // 标签
          label: {
            normal:{
              show:true,
              fontSize:7,
              position:"right",
              color:"#001"
            },
            emphasis: {
              textStyle: {
                color: '#000'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#389BB7',
              areaColor: '#fff',
            },
            emphasis: {
              areaColor: '#FFF90D',
              borderWidth: 0
            }
          },
          animation: false,
          data
        }],
    
      };
    
      chart.setOption(option);
      // this.setData({isLoadingMap:false})
     
    },500)
    
  },
})
