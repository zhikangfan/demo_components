import type { ModalProps } from 'ant-design-vue'

export enum Volume {
  I, // 上册
  II, // 下册
}
export enum Grade {
  Frist = 1,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
}
export enum Edition {
  DepartmentalEdition, // 部编版
  DepartmentalEdition5Year, // 部编5年版
  UnifiedEdition, // 统编版
}

export enum LearnType {
  Read, // 识字
  Write, // 写字
}
// 章节
export interface Section {
  name: string
  lessons: Lesson[]
}
// 每一课
export interface Lesson {
  name: string
  content: string[]
  learnType: LearnType[]
}
// 教材
export interface Textbook {
  grade: Grade
  volume: Volume
  edition: Edition
  sections: Section[]
}

export interface TextbookProps extends Omit<ModalProps, 'title'> {
  grade?: Grade
  volume?: Volume
  edition?: Edition
}
