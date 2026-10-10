export function request<T = any>(options: any): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: `${import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com'}${options.url}`,
      header: {
        'tenant-id': '1',
        'Authorization': `Bearer ${uni.getStorageSync('ACCESS_TOKEN') || ''}`,
        ...options.header,
      },
      success: (res: any) => {
        if (res.data?.code === 0) resolve(res.data.data);
        else reject(new Error(res.data?.msg || 'Request Failed'));
      },
      fail: (err: any) => reject(err)
    });
  });
}
