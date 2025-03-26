// 封装所有API请求
export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    
    const res = await fetch('/api/protected', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!res.ok) {
      if (res.status === 401) {
        // Token过期，跳转到登录页
        window.location.href = '/login';
      }
      throw new Error(await res.text());
    }
  
    return res.json();
  };
  
  // 在组件中使用示例：
  // import { fetchProtectedData } from '@/lib/apiClient';
  // const data = await fetchProtectedData();