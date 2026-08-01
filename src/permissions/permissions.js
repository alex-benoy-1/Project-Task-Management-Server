const  permissions = {
    //Organization
    ORGANIZATION_VIEW : "organization:view",
    ORGANIZATION_CREATE : "organization:create",
    ORGANIZATION_UPDATE : "organization:update",
    ORGANIZATION_DELETE : "organization:delete",

    //Organization member
    ORGANIZATION_MEMBER_VIEW : "organization_member:view",
    ORGANIZATION_MEMBER_CREATE : "organization_member:create",
    ORGANIZATION_MEMBER_UPDATE : "organization_member:update",
    ORGANIZATION_MEMBER_DELETE : "organization_member:delete",

    //Project
    PROJECT_VIEW : "project:view",
    PROJECT_CREATE : "project:create",
    PROJECT_UPDATE : "project:update",
    PROJECT_DELETE : "project:delete",  

    //Project member
    PROJECT_MEMBER_VIEW : "project_member:view",
    PROJECT_MEMBER_CREATE : "project_member:create",
    PROJECT_MEMBER_UPDATE : "project_member:update",
    PROJECT_MEMBER_DELETE : "project_member:delete",
    
    //Task
    TASK_VIEW : "task:view",
    TASK_CREATE : "task:create",
    TASK_UPDATE : "task:update",
    TASK_DELETE : "task:delete",

    //Comment
    COMMENT_VIEW : "comment:view",
    COMMENT_CREATE : "comment:create",
    COMMENT_UPDATE : "comment:update",
    COMMENT_DELETE : "comment:delete",
}

export default permissions;