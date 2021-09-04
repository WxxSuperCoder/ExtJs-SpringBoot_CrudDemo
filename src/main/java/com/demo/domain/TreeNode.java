package com.demo.domain;

public class TreeNode {
    private String id;
    private String text; //节点名称
    private boolean leaf; //是否叶子
    private String cls; //图标
    private String href; //链接
    private String hrefTarget; //链接指向
    private boolean expandable; //是否展开
    private String description; //描述信息

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public boolean isLeaf() {
        return leaf;
    }
    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }
    public String getCls() {
        return cls;
    }
    public void setCls(String cls) {
        this.cls = cls;
    }
    public String getHref() {
        return href;
    }
    public void setHref(String href) {
        this.href = href;
    }
    public String getHrefTarget() {
        return hrefTarget;
    }
    public void setHrefTarget(String hrefTarget) {
        this.hrefTarget = hrefTarget;
    }
    public boolean isExpandable() {
        return expandable;
    }
    public void setExpandable(boolean expandable) {
        this.expandable = expandable;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
