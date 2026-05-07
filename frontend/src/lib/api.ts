import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Course {
  id: number;
  name: string;
}

export interface College {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placement: number;
  courses: Course[];
}

export const fetchColleges = async (params?: { search?: string; location?: string; maxFees?: number; page?: number }) => {
  const response = await axios.get(`${API_URL}/colleges`, { params });
  return response.data;
};

export const fetchCollegeById = async (id: number) => {
  const response = await axios.get(`${API_URL}/colleges/${id}`);
  return response.data as College;
};

export const fetchCompareColleges = async (ids: number[]) => {
  if (ids.length < 2) return [];
  const response = await axios.get(`${API_URL}/compare`, {
    params: { ids: ids.join(',') },
  });
  return response.data as College[];
};
