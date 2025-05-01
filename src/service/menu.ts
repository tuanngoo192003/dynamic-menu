import { MenuModel } from "../model/menu";

export const GetMenu = (): Promise<MenuModel[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Dashboard',
            level: 0,
            isChecked: false,
            children: [],
          },
          {
            id: 2,
            name: 'Management',
            level: 0,
            isChecked: false,
            children: [
              {
                id: 3,
                name: 'Users',
                level: 1,
                isChecked: false,
                children: [
                  {
                    id: 4,
                    name: 'User List',
                    level: 2,
                    isChecked: false,
                    children: [],
                  },
                  {
                    id: 5,
                    name: 'User Roles',
                    level: 2,
                    isChecked: false,
                    children: [],
                  },
                ],
              },
              {
                id: 6,
                name: 'Settings',
                level: 1,
                isChecked: false,
                children: [],
              },
            ],
          },
          {
            id: 7,
            name: 'Reports',
            level: 0,
            isChecked: false,
            children: [
              {
                id: 8,
                name: 'Sales',
                level: 1,
                isChecked: false,
                children: [],
              },
              {
                id: 9,
                name: 'Finance',
                level: 1,
                isChecked: false,
                children: [],
              },
            ],
          },
        ]);
      }, 300);
    });
  };
  