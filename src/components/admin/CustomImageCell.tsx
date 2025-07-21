// https://dev.to/aaronksaunders/display-images-in-your-payload-cms-admin-collection-list-with-custom-cell-component-8f9
import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

const MyComponent = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  const media = await payload.findByID({
    collection: 'media',
    id: cellData,
  })

  return (
    <div
      style={{
        position: 'relative',
        width: '120px',
        height: '120px',
      }}
    >
      <Image
        src={media.url!}
        alt={media.alt}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
export default MyComponent
