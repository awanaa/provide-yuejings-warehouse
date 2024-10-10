import request from "@/utils/request";
import type {SignData,SignedData,DaysMatterData,DaibanData,CourseData} from './type'

enum API {
    SIGN_URL = '/user/sign/view',
    SIGNED_URL = '/user/sign',
    DaysMatter_URL = '/daysMatter/list',
    DaysMatterAdd_URL = '/daysMatter/add',
    DaysMatterxiugai_URL = '/daysMatter/update',
    CheckListGetChecklists_URL='/checkList/getChecklists',
    CheckListTimerStart_URL='/checkList/Timer/start',
    CheckListTimerEnd_URL='/checkList/Timer/end',
    CheckListUpdate_URL='/checkList/update',
    CourseListCourse_URL = '/course/listCourse',
    CheckListAdd_URL = '/checkList/add',
}

export function getSignData() {
    return request.get<SignData>(API.SIGN_URL);
}

export async function postsigned(signReward: number): Promise<SignedData> {
    return request.post(API.SIGNED_URL, { signReward });
}

export async function getDaysMatter() {
    return request.get<DaysMatterData[]>(API.DaysMatter_URL);
}

export async function postDaysMatterAdd(data: DaysMatterData) {
    return request.post(API.DaysMatterAdd_URL, data);
  }

export async function postDaysMatterxiugai(data: DaysMatterData) {
    return request.post(API.DaysMatterxiugai_URL, data);
  }

export async function getCheckListGetChecklists() {
    return request.get<DaibanData[]>(API.CheckListGetChecklists_URL);
}

export async function postCheckListTimerStart(data: DaibanData) {
    return request.post(API.CheckListTimerStart_URL, data);
  }

  export async function postCheckListTimerEnd(data: DaibanData) {
    return request.put(API.CheckListTimerEnd_URL, data);
  }

  export async function postCheckListUpdate(data: DaibanData) {
    return request.put(API.CheckListUpdate_URL, data);
  }

  export async function getCourseListCourse(year:number, semester:number) {
    return request.get<CourseData[]>(API.CourseListCourse_URL);
  }

  export async function postCheckListAdd(data: DaibanData) {
    return request.post(API.CheckListAdd_URL, data);
  }