import request from "@/utils/request";
import type {SignData,SignedData,DaysMatterData,DaibanData,CourseData} from './type'


enum API {
  UserGetInfo_URL = '/user/getInfo',
    SIGN_URL = '/user/sign/view',
    SIGNED_URL = '/user/sign',
    DaysMatter_URL = '/daysMatter/list',
    DaysMatterAdd_URL = '/daysMatter/add',
    DaysMatterxiugai_URL = '/daysMatter/update',
    CheckListGetChecklists_URL='/checkList/getChecklists',
    CheckListTimerStart_URL='/checkList/Timer/start',
    CheckListTimerEnd_URL='/checkList/Timer/end',
    CheckListUpdate_URL='/checkList/update',
    CheckListDelete_URL='/checkList/delete',
    CourseListCourse_URL = '/course/listCourse',
    CourseQueryWeek_URL = '/course/queryWeek',
    CheckListAdd_URL = '/checkList/add',
}
export async function getUserInfo() {
  return request.get(API.UserGetInfo_URL);
}

export function getSignData() {
    return request.get<SignData>(API.SIGN_URL);
}

export async function postsigned(signReward: number): Promise<SignedData> {
    return request.post(API.SIGNED_URL, { params: { signReward } });
}

export async function getDaysMatter() {
    return request.get<DaysMatterData[]>(API.DaysMatter_URL);
}

export async function postDaysMatterAdd(data: DaysMatterData) {
    return request.post(API.DaysMatterAdd_URL, data);
  }

export async function postDaysMatterxiugai(data: DaysMatterData) {
    return request.put(API.DaysMatterxiugai_URL, data);
  }

export async function getCheckListGetChecklists(params) {
    return request.get<DaibanData[]>(API.CheckListGetChecklists_URL);
}

export async function postCheckListTimerStart(checklistId:number) {
    return request.get(API.CheckListTimerStart_URL,{params:{checklistId}});
  }

  export async function postCheckListTimerEnd(data: DaibanData) {
    return request.put(API.CheckListTimerEnd_URL, data);
  }

  export async function postCheckListUpdate(data: DaibanData) {
    return request.put(API.CheckListUpdate_URL, data);
  }

  export async function postCheckListDelete(checklistId:number) {
    return request.delete<DaibanData[]>(API.CheckListDelete_URL,{
      params: { checklistId }
    });
  }

  export async function getCourseListCourse(year:number, semester:number,week:number) {
    return request.get<CourseData[]>(API.CourseListCourse_URL,{
      params: { year, semester,week }
    });
  }
  //传过去不要json格式
  export async function getCourseQueryWeek(year: number, semester: number, week: number) {
    const params = new URLSearchParams();
    params.append('year', year.toString());
    params.append('semester', semester.toString());
    params.append('week', week.toString());
  
    return request.post<CourseData[]>(API.CourseQueryWeek_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
  
  export async function postCheckListAdd(data: DaibanData) {
    return request.post(API.CheckListAdd_URL, data);
  }