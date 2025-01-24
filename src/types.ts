export interface Team {
    id: string;
    team_name: string;
    institution_name: string;
    score: number;
    created_at: string;
  }
  
  export interface TeamMember {
    id: string;
    team_id: string;
    name: string;
    created_at: string;
  }