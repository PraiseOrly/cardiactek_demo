import { create } from 'zustand';

// Global app state with Zustand
export const useAppStore = create((set, get) => ({
  // Current user
  currentUser: {
    id: 'cli-001',
    name: 'Dr. Amara Diallo',
    role: 'frontline', // 'frontline' | 'cardiologist'
    facilityId: 'fac-001'
  },

  // Switch role for testing (demo feature)
  switchRole: (role) => {
    const roleMap = {
      frontline: {
        id: 'cli-001',
        name: 'Dr. Amara Diallo',
        role: 'frontline',
        facilityId: 'fac-001'
      },
      cardiologist: {
        id: 'cli-004',
        name: 'Prof. Kwesi Appiah',
        role: 'cardiologist',
        facilityId: 'fac-003'
      }
    };
    set({ currentUser: roleMap[role] });
  },

  // Worklist filters
  worklistFilter: {
    view: 'mine', // 'mine' | 'facility' | 'all'
    status: 'waiting', // 'waiting' | 'in_review' | 'done'
    search: ''
  },

  setWorklistFilter: (filter) => set({ worklistFilter: { ...get().worklistFilter, ...filter } }),

  // Notifications
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notif = { id, ...notification, createdAt: new Date() };
    set({ notifications: [notif, ...get().notifications] });
    setTimeout(() => {
      set({ notifications: get().notifications.filter(n => n.id !== id) });
    }, 5000);
  }
}));
