
// types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface ChartData {
  name: string;
  value: number;
}
