import partsIMG from '../../components/part.png'
export const resultsConfig = {
  entityTypeConfig: {
    "path": "extracted.envelope.instance.info.title"
  },
  entities: [
    {
      entityType: 'weapon',
      title: {
        path: 'extracted.envelope.instance.weapon.name'
      },
      items: [
        { label: "id", path: 'extracted.envelope.instance.weapon.id' },
        { label: "Serial Number", path: 'extracted.envelope.instance.weapon.serialNumber' },
        { label: "Type", path: 'extracted.envelope.instance.weapon.type' }
      ]
    },
    {
      entityType: 'weaponPart',
      title: {
        path: 'extracted.envelope.instance.weaponPart.name'
      },
      items: [
        { label: "id", path: 'extracted.envelope.instance.weaponPart.id' },
        { label: "Serial Number", path: 'extracted.envelope.instance.weaponPart.serialNumber' },
        { label: "Model", path: 'extracted.envelope.instance.weaponPart.model' }
      ],
      avatarProps: {
        border: false,
        themeColor: 'info',
        rounded: 'full',
        type: 'image',
        style: { flexBasis: 50, height: 50 },
        avatarImage: {
          value: partsIMG
        },
      }
    }
  ]
};

export default resultsConfig;