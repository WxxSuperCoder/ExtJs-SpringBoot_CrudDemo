Ext.onReady(function () {
    /**
     * Tab1标签内容
     */
    var tabPanelOne = new Ext.grid.GridPanel({
        id: "tabPanelOne",
        title: "信息管理",
        tbar: toolsbarTop,//表格顶部工具条
        bbar: ptb,//翻页功能
        cm: cm,//序号列
        sm: sm,//复选框
        store: tableStore,
        autoExpandColumn: "memo", //自动伸展，占满剩余区域
    })
    /*______________________________________________________________________*/
    /**
     * north布局内容
     */
    var panelTop = new Ext.Panel({
        id: 'panelTop',
        region: 'north',
        height: 25,
        tbar: toobarTop
    })
    /**
     * south布局内容
     */
    var panelFooter = new Ext.Panel({
        id: 'panelFooter',
        region: 'south',
        height: 25,
        tbar: toobarFooter
    })
    /**
     * west布局内容
     */
    var panelLeft = new Ext.Panel({
        id: 'panelLeft',
        region: 'west',
        frame: true,
        width: 250,
        minWidth: 50,
        maxWidth: 250,
        autoScroll: true,//内容超出显示滚动条（横向和纵向）
        autoHeight: true,
        split: true, //可改变框体大小
        collapsible: true,  //设置面板可以折叠
        tbar: tree
    })
    /**
     * center布局内容
     */
    var panelCenter = new Ext.TabPanel({
        id: 'panelCenter',
        region: 'center',
        collapsible: true, //可收缩
        // bodyBorder: true,
        activeTab: 0, // index or id
        items: [tabPanelOne, {
            title: 'Tab 2',
            html: '我是Tab 2 的内容'
        }, {
            title: 'Tab 3',
            html: '我是Tab 3 的内容'
        }]
    });
    /*______________________________________________________________________*/
    /**
     * 整体Ext.Viewport代表浏览器窗口的整个显示区域，将document body作为渲染对象，它会根据浏览器窗口的大小自动调整自身的尺寸。在一个页面中只允许出现一个Viewport实例
     */
    var viewport = new Ext.Viewport({
        id: 'allPanel',
        layout: 'border',
        renderTo: Ext.getBody(),//加载html中body的时候加载ext
        frame: true,//可以为panel添加蓝色背景圆角边框
        bodyborder: true,
        items: [panelTop, panelFooter, panelLeft, panelCenter]
    })
});
tableStore.load()

/*______________________________________________________________________*/
/**
 * 数据回显
 * @param id
 */
function modify(id) {
    Ext.Ajax.request({
        url: 'getById',
        //url携带参数
        params: {
            id: id
        },
        success: function (response) {
            //获取后台response写入的值
            var data = JSON.parse(response.responseText);
            let win = new Ext.Window({
                width: 600,
                height: 300,
                closable: true,
                layout: 'fit',//布局方式
                maximizable: true,//显示最大化按钮,点击最大化按钮,窗口自动扩展充满整个浏览器,并且窗口右上角的最大化按钮变为回复原状的按钮
                minimizable: true,//显示最小化按钮,并未对这个按钮做任何处理,可以添加监听事件minimizable或重写minimizable()函数
                closeAction: 'hide',
                constrainHeader: true,//设置窗口的顶部不会超出浏览器边界
                //constrain:true,//设置整个窗口都不回超出浏览器边界
                defaultButton: 0,//默认选中的按钮
                resizable: true,//控制窗口是否可以通过拖拽改变大小
                resizeHandles: 'se',//控制拖拽方式,必须是在设置了resizable的情况下,
                modal: true,//弹出窗口后立刻屏蔽掉其他的组件,只有关闭窗口后才能操作其他组件,
                plain: true,//对窗口内部内容惊醒美化,可以看到整齐的边框
                animateTarget: 'target',//可以使窗口展示弹并缩回效果的动画
                items: [{
                    layout: 'form',
                    defaultType: 'textfield',
                    defaults: {width: 200},
                    style: {
                        marginTop: 10,
                        marginLeft: 10
                    },
                    labelWidth: 60,
                    labelAlign: 'right',
                    items: [
                        {
                            style: {
                                marginTop: "10px",
                                marginLeft: "10px"
                            },
                            labelStyle: 'margin-Top:10px',
                            fieldLabel: '姓名',
                            value: data.name,
                            id: "name"
                        }, {
                            style: {
                                marginTop: "10px",
                                marginLeft: "10px"
                            },
                            labelStyle: 'margin-Top:10px',
                            fieldLabel: '性别',
                            value: data.sex,
                            id: "sex"
                        }, {
                            style: {
                                marginTop: "10px",
                                marginLeft: "10px"
                            },
                            labelStyle: 'margin-Top:10px',
                            fieldLabel: '生日',
                            value: data.birthday,
                            id: "birthday"
                        }, {
                            style: {
                                marginTop: "10px",
                                marginLeft: "10px"
                            },
                            labelStyle: 'margin-Top:10px',
                            fieldLabel: '学历',
                            value: data.edu,
                            id: "edu"
                        },
                        {
                            style: {
                                marginTop: "10px",
                                marginLeft: "10px"
                            },
                            labelStyle: 'margin-Top:10px',
                            fieldLabel: '备注',
                            value: data.memo,
                            id: "memo"
                        }
                    ]
                }],
                buttons: [
                    {
                        text: '修改',
                        handler: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                            console.log(value);
                            console.log(cellmeta);
                            console.log(record);

                            let name = Ext.get("name").dom.value
                            let sex = Ext.get("sex").dom.value
                            let birthday = Ext.get("birthday").dom.value
                            let edu = Ext.get("edu").dom.value
                            let memo = Ext.get("memo").dom.value
                            document.location.href = "/modify?name=" + name + "&sex=" + sex + "&birthday=" + birthday + "&edu=" + edu + "&memo=" + memo + "&id=" + id
                            win.hide();
                        }
                    }, {
                        text: '取消',
                        handler: function () {
                            win.close();
                        }
                    }
                ]
            });
            win.show();
        }
    });
}

/*______________________________________________________________________*/
/**
 * "添加"按钮实现
 */
function add() {
    let win = new Ext.Window({
        width: 600,
        height: 300,
        closable: true,
        layout: 'fit',//布局方式
        maximizable: true,//显示最大化按钮,点击最大化按钮,窗口自动扩展充满整个浏览器,并且窗口右上角的最大化按钮变为回复原状的按钮
        minimizable: true,//显示最小化按钮,并未对这个按钮做任何处理,可以添加监听事件minimizable或重写minimizable()函数
        closeAction: 'hide',
        constrainHeader: true,//设置窗口的顶部不会超出浏览器边界
        //constrain:true,//设置整个窗口都不回超出浏览器边界
        defaultButton: 0,//默认选中的按钮
        resizable: true,//控制窗口是否可以通过拖拽改变大小
        resizeHandles: 'se',//控制拖拽方式,必须是在设置了resizable的情况下,
        modal: true,//弹出窗口后立刻屏蔽掉其他的组件,只有关闭窗口后才能操作其他组件,
        plain: true,//对窗口内部内容惊醒美化,可以看到整齐的边框
        animateTarget: 'target',//可以使窗口展示弹并缩回效果的动画
        items: [{
            layout: 'form',
            defaultType: 'textfield',
            defaults: {width: 200},
            style: {
                marginTop: 10,
                marginLeft: 10
            },
            labelWidth: 60,
            labelAlign: 'right',
            items: [
                {
                    style: {
                        marginTop: "10px",
                        marginLeft: "10px"
                    },
                    labelStyle: 'margin-Top:10px',
                    fieldLabel: '姓名',
                    id: "name"
                }, {
                    style: {
                        marginTop: "10px",
                        marginLeft: "10px"
                    },
                    labelStyle: 'margin-Top:10px',
                    fieldLabel: '性别',
                    id: "sex"
                }, {
                    style: {
                        marginTop: "10px",
                        marginLeft: "10px"
                    },
                    labelStyle: 'margin-Top:10px',
                    fieldLabel: '生日',
                    id: "birthday"
                }, {
                    style: {
                        marginTop: "10px",
                        marginLeft: "10px"
                    },
                    labelStyle: 'margin-Top:10px',
                    fieldLabel: '学历',
                    id: "edu"
                },
                {
                    style: {
                        marginTop: "10px",
                        marginLeft: "10px"
                    },
                    labelStyle: 'margin-Top:10px',
                    fieldLabel: '备注',
                    id: "memo"
                }
            ]

        }],
        buttons: [
            {
                text: '添加',
                handler: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    let name = Ext.get("name").dom.value
                    let sex = Ext.get("sex").dom.value
                    let birthday = Ext.get("birthday").dom.value
                    let edu = Ext.get("edu").dom.value
                    let memo = Ext.get("memo").dom.value
                    document.location.href = "/add?name=" + name + "&sex=" + sex + "&birthday=" + birthday + "&edu=" + edu + "&memo=" + memo
                    win.hide();
                }
            }, {
                text: '取消',
                handler: function () {
                    win.close();
                }
            }
        ]
    });
    win.show();
}

