//定义首页模块ts数据类型
export interface ResponseData {
    code : number;
    msg : string;
}

//签到页面展示数据
export interface SignData {
    "signCount": number,
    "rewards":[]
}

//签到页面提交数据
export interface SignedData {
    "signReward": number
}

//倒数日展示数据
export interface DaysMatterData {
    daysMatterId: number;
    userId: number;
    daysMatterTitle: string;
    targetDay: Date;
    repeatType: number;
    repeatNum: number;
    backdropUrl: string;
    status: number;
    matterType: number;
    daysNum: number;		
}


//待办展示数据
export interface DaibanData {
    "checklistId": number,
    "userId": number,
    "checklistTitle": string,
    "checklistType": number,
    "priority": number,
    "deadline": string,
    "timeSpan": number,
    "checklistStatus": number,
    "timeDuration": number,
    "todayDoTime": number,
    "timingDate": null,
    "mustDoDay": string,
    "createBy": string,
    "createTime": string,
    "updateBy": string,
    "updateTime": string
}



//课表数据展示
export interface CourseData {
    "courseId": string,
    "courseName": string,
    "courseTime": string,
    "year": number,
    "semester": number,
    "weekday": number,
    "time": string,
    "courseType": string,
    "courseNature": string,
    "teacher": string,
    "building": string,
    "classroom": string,
    "campus":  string,
    "score": string,
    "schedule": string,
    "repeatNum": number,
    "totalHours": number,
    "theoryHours": number,
    "subject": null,
    "profile": null,
    "chapter": null,
    "material": null
}