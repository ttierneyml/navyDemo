import partsIMG from '../components/part.png'
export const weaponConfig = {
  entityTypeConfig: {
    "path": "envelope.instance.info.title" // child key of root
  },
  entities: [
    {
      entityType: 'weapon',
      // entityTypeDisplay: 'Weapon',
      title: {
        value: 'Weapon',
      },
      items: [
        {
          label: 'Type',
          path: 'envelope.instance.weapon.type'
        },
        {
          label: 'Serial Number',
          path: 'envelope.instance.weapon.serialNumber'
        },
        {
          label: 'Caliber',
          path: 'envelope.instance.weapon.caliber'
        },
        {
          label: 'Action',
          path: 'envelope.instance.weapon.action'
        }
      ],
      avatarProps: {
        border: false,
        themeColor: 'info',
        rounded: 'full',
        type: 'image',
        style: { flexBasis: 140, height: 140 },
        avatarImage: {
          value: 'hello'
        },
      }
    },
  ],
}

export const weaponPartConfig = {
  entityTypeConfig: {
    "path": "envelope.instance.info.title" // child key of root
  },
  entities: [
    {
      entityType: 'weaponPart',
      //entityTypeDisplay: 'Member',
      title: {
        value: 'Weapon Part'
      },
      items: [
        {
          label: 'Model',
          path: 'envelope.instance.weaponPart.model'
        },
        {
          label: 'Serial Number',
          path: 'envelope.instance.weaponPart.serialNumber'
        }
      ],
      avatarProps: {
        border: false,
        themeColor: 'info',
        rounded: 'full',
        type: 'image',
        style: { flexBasis: 80, height: 80 },
        avatarImage: {
          value: partsIMG
        },
      }
    },
  ],
}