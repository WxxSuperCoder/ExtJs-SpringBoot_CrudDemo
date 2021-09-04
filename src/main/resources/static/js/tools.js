/**
 * 上工具栏
 * @type {Ext.Toolbar}
 */
var toobarTop = new Ext.Toolbar({
    height: 25,
    items: ['->', {
        xtype: 'tbtext',  //工具栏文本项
        text: '欢迎　管理员'
    },
        {
            xtype: 'tbseparator', //工具栏分隔符
            width: 20
        },
        {
            xtype: 'tbbutton', //按钮
            text: '退出'
        }]
});
/*______________________________________________________________________*/
/**
 * 下状态栏
 * @type {Ext.Toolbar}
 */
var toobarFooter = new Ext.Toolbar({
    height: 25,
    items: [{
        xtype: 'tbtext',
        text: '管理系统'
    }, '->', {
        text: '当前时间：' + new Date().format('Y- m - d')
    }, {
        xtype: 'tbspacer',
        width: 20
    }]
});
/*______________________________________________________________________*/
/**
 * 工具条
 * @type {Ext.Toolbar}
 */
var toolsbarTop = new Ext.Toolbar({
    autoHeight: true,
    Width: true,

    items: [{
        text: '添加',
        tooltip: 'add',
        handler: function () {
            add()
        }
    }, "->", {
        xtype: 'tbspacer',
        width: 20
    }, '-', {
        xtype: 'tbtext',
        text: '搜索条件'
    },
        {
            xtype: 'textfield',
            name: 'field1',
            emptyText: '',
            id: 'tb'
        }, {
            text: '搜索',
            tooltip: '',
            id: 'tbBtn',
            handler: function () {
                let name = Ext.get('tb').dom.value
                document.location.href = "/?name=" + name
            }
        },
        {
            xtype: 'tbspacer',
            width: 30
        }
    ]
});