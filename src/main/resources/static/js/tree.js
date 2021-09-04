/**
 * 部门树
 */
var tree = new Ext.tree.TreePanel({
    width: "250px",
    id: 'tree-mianban',
    title: '树',
    region: 'west',
    animate: true, //动画效果
    enableDD: true,//树节点是否可以拖动
    containerScroll: false,
    loader: new Ext.tree.TreeLoader({}),
    lines: true,
    containerScroll: false,
    border: true
});
/*______________________________________________________________________*/
/**
 * 根节点
 * @type {Ext.tree.AsyncTreeNode}
 */
var root = new Ext.tree.AsyncTreeNode({
    text: '软件部门',
    draggable:true, //拖拽
    id: 'root',
    children: json
});
/*______________________________________________________________________*/
/**
 * 树形编辑器
 * @type {Ext.tree.TreeEditor}
 */
var treeEditer = new Ext.tree.TreeEditor(Ext.getCmp('tree-mianban'), { //Ext.getCmp根据组件id获取组件参数
    id: 'tree-Manage',
    allowBlank: false     // 输入值不可以为空
});
/*______________________________________________________________________*/
/**
 * 弹出窗口
 */
var win = new Ext.Window({
    maskDisabled: false,
    id: 'tree-window',
    modal: true,// 是否为模式窗口
    constrain: true,// 窗口只能在viewport指定的范围
    closable: true,// 窗口是否可以关闭
    closeAction: 'hide',
    layout: 'fit',
    width: 300,
    height: 200,
    plain: true,
    items: [{
        id: 'tree-window-view',
        border: false
    }]
});
/*______________________________________________________________________*/
/**
 * 给tree添加事件
 */
tree.on('rightClickCont', tree.rightClick, tree);

/*______________________________________________________________________*/
/**
 * 模块销毁函数
 */
function destroy() {
    this.win.destroy();// 将win窗口销毁，否则在IE中会报错
}
/*______________________________________________________________________*/
// 加载 tree TreePane
tree.setRootNode(root);
tree.render(document.body);
root.expand(true, true);
/*______________________________________________________________________*/
/**
 * 定义右键菜单
 */
var rightClick = new Ext.menu.Menu({
    id: 'rightClickCont',
    items: [{
        id: 'addNode',
        text: '添加',
        // 增加菜单点击事件
        menu: [{
            id: 'insertNode',
            text: '添加兄弟节点',
            handler: function (tree) {
                insertNode();
            }
        }, {
            id: 'appendNode',
            text: '添加儿子节点',
            handler: function (tree) {
                appendNodeAction();
            }
        }]
    }, '-', {
        id: 'delNode',
        text: '删除',
        handler: function (tree) {
            delNodeAction();
        }
    }, {
        id: 'viewNode',
        text: '查看',
        handler: function (tree) {
            veiwNodeAction();
        }
    }]
});
// 添加点击事件
tree.on('click', function (node) {
    if (node.id != 'root') {
        // alert(node.id);
        alert('我是：' + node.text + ',我的id是' + node.id + '');
    }
});
/*______________________________________________________________________*/
/**
 * 右键弹出事件
 */
tree.on('contextmenu', function (node, event) {// 声明菜单类型
    event.preventDefault();// 这行是必须的，使用preventDefault方法可防止浏览器的默认事件操作发生。
    node.select();
    rightClick.showAt(event.getXY());// 取得鼠标点击坐标，展示菜单
});

/*______________________________________________________________________*/
/**
 * 添加兄弟节点
 */
function insertNode() {

    var selectedNode = tree.getSelectionModel().getSelectedNode();

    var selectedParentNode = selectedNode.parentNode;

    var newNode = new Ext.tree.TreeNode({
        text: '新建节点' + selectedNode.id
    });
    if (selectedParentNode == null) {
        selectedNode.appendChild(newNode);
    } else {
        selectedParentNode.insertBefore(newNode, selectedNode);
    }

    setTimeout(function () {
        treeEditor.editNode = newNode;
        treeEditor.startEdit(newNode.ui.textNode);
    }, 10);
};

/*______________________________________________________________________*/
/**
 * 添加儿子节点
 */
function appendNodeAction() {

    var selectedNode = tree.getSelectionModel().getSelectedNode();
    if (selectedNode.isLeaf()) {
        selectedNode.leaf = false;
    }
    var newNode = selectedNode.appendChild(new Ext.tree.TreeNode({
        text: '新建节点' + selectedNode.id
    }));
    newNode.parentNode.expand(true, true, function () { // 将上级树形展开
        tree.getSelectionModel().select(newNode);
        setTimeout(function () {
            treeEditor.editNode = newNode;
            treeEditor.startEdit(newNode.ui.textNode);
        }, 10);
    });
}

/*______________________________________________________________________*/
/**
 * 删除节点
 */
function delNodeAction() {

    var selectedNode = tree.getSelectionModel().getSelectedNode();
    // 得到选中的节点
    selectedNode.remove();
};

/*______________________________________________________________________*/
/**
 * 修改节点
 */
function modifNodeAction() {

    var selectedNode = tree.getSelectionModel().getSelectedNode();// 得到选中的节点
    treeEditor.editNode = selectedNode;
    treeEditor.startEdit(selectedNode.ui.textNode);
};

/*______________________________________________________________________*/
/**
 * 查看节点
 */
function veiwNodeAction() {

    var viewPanel = Ext.getCmp('tree-window-view');
    var selectedNode = tree.getSelectionModel().getSelectedNode();
    // 得到选中的节点
    var tmpid = selectedNode.attributes.id;
    var tmpname = selectedNode.attributes.text;
    var tmpdes = selectedNode.attributes.des;

    win.setTitle(tmpname + '的介绍');
    win.show();

    var dataObj = {
        id: tmpid,
        name: tmpname,
        des: tmpdes
    }

    var tmpTpl = new Ext.Template([
        '<div style="margin:10px"><div style="margin:10px">编号:{id}</div>',
        '<div style="margin:10px">名称:{name}</div>',
        '<div style="margin:10px">描述:{des}</div></div>']);
        tmpTpl.overwrite(viewPanel.body, dataObj);
};
//panelTree.render();//记得render,不然不显示