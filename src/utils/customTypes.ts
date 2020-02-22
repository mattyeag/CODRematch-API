
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

export interface UserLoginInput{
    username : string
    password : string
}

export interface UserAuthObj {
    username: string;
    private_key: string;
    access_token: string;
    token_exp_ts: string;
}

export interface Player {
    user_id: number; 
    game_id: number;
    platform_id: string;
    player_tag: string;
    alt_player_tag: string;
    player_pass: string;
    team_id: string;
}