/**
 * 序号
 * @type {{renderer: (function(*, *, *, *)), dataIndex: string, rowspan: undefined, width: number, menuDisabled: boolean, header: string, fixed: boolean, id: string, sortable: boolean, align: string}}
 */
Ext.grid.RowNumberer.prototype = {
    id: 'numberer',
    header: "序号",
    width: 40,
    align: "center",
    sortable: false,
    fixed: true,
    menuDisabled: true,
    dataIndex: '',
    rowspan: undefined,
    renderer: function (v, p, record, rowIndex) {
        if (this.rowspan) {
            p.cellAttr = 'rowspan="' + this.rowspan + '"';
        }
        return rowIndex + 1;
    }
};
/*__________________________________________________________*/
/**
 * 复选框
 */
var sm = new Ext.grid.CheckboxSelectionModel();
/*__________________________________________________________*/
/**
 * 列模型
 * dataIndex 必须和Human结构中的name 属性值对应
 * @type {Ext.grid.ColumnModel}
 */
var cm = new Ext.grid.ColumnModel(
    [
        Ext.grid.RowNumberer.prototype,
        sm,
        {header: '姓名', width: '50px', dataIndex: 'Name', align: "center"},    //dataIndex表示记录结构中的name属性值
        {header: '性别', width: '50px', dataIndex: 'Sex', align: "center"},
        {
            header: '生日',
            width: '80px',
            dataIndex: 'Birthday',
            renderer: Ext.util.Format.dateRenderer("Y-m-d"),
            align: "center"
        }, //格式化日期
        {header: '学历', width: '50px', dataIndex: 'Edu', align: "center"},
        {header: '备注', width: '100px', id: "memo", dataIndex: 'Memo', align: "center"},
        {
            align: "center",
            header: "操作",
            width: "100px",
            dataIndex: "rowId",
            //hideable:false,   //该列不在menuDisabled中显示
            renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                var modify = "<a onclick='modify(" + record.data.id + ")' href='javascript:void(0)'>修改</a>";
                var remove = "<a href='delete?id=" + record.data.id + "'>删除</a>";
                return "<span align='center'>" + modify + " " + remove + "</span>";
            }
        }
    ]
);

var Human = Ext.data.Record.create([{
    name: 'Name',
    type: 'string',
    mapping: 'name'
},
    {
        name: 'Sex',
        type: 'string',
        mapping: 'sex'
    },
    {
        name: 'Birthday',
        type: 'string',
        mapping: 'birthday'
    },
    {
        name: 'Edu',
        type: 'string',
        mapping: 'edu'
    },
    {
        name: 'Memo',
        type: 'string',
        mapping: 'memo'
    },
    {
        name: 'id',
        type: 'string',
        mapping: 'id'
    }
])

//从服务器端以Json格式读取数据，并显示在前端页面中
const tableStore = new Ext.data.Store({ //每个store需要两个组件的支持，分别是proxy和reader
    proxy: new Ext.data.MemoryProxy(data),　　//从某个途径读取原始数据
    reader: new Ext.data.JsonReader({}, Human)　//将原始数据转换成Record实例
})
tableStore.load()
/*______________________________________________________________________*/
/**
 * 底部分页
 */
var ptb = new Ext.PagingToolbar({
    pageSize: 20,　　//一页中显示多少条记录
    store: tableStore,  //与表格是相同的数据来源
    displayInfo: true,
    displayMsg: "显示第 {0} 条到 第{1} 条记录，一共 {2} 条",
    emptyMsg: "没有记录",
});