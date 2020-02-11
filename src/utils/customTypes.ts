
export interface PlayerParams {
    userName: string; 
    platform: string; 
    gameTitle: string; 
}

export interface User { 
      userEmail: string;
      userName: string;
      displayName: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      key: string;
      loginDate: Date;      
}

export interface insertQueryObject{
    insertUserSql: string
    insertAuthSql: string
}