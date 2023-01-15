// 비밀번호 - 8~16자 영문 대 소문자, 숫자, 특수문자
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

// 유저명 - 4~15자 영문 대 소문자, 숫자, 밑줄 (최소 하나의 영문 포함)
export const usernameRegex = /^(?=.*[a-zA-Z0-9])(?=.*_?)[a-zA-Z0-9_]{4,15}$/;

// 실명 - 1~12자 영문 대 소문자, 한글
export const realnameRegex = /^(?=.[가-힣ㄱ-ㅎa-zA-Z])[가-힣ㄱ-ㅎa-zA-Z]{1,12}$/;
