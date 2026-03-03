import * as THREE from 'three'

export class ModelMetadata {
  fileName: string
  vertices: number
  faces: number
  uniqueMaterials: Array<string>
  materialCount: number
  timestamp: Date = new Date()

  constructor(scene: THREE.Group, filePath: string) {
      const data = getModelMetadata(scene, filePath)
      if (!data) {
        throw new Error("ModelMetadata error : can't load metadata")
      }

      this.fileName = data.fileName ?? "Unknown"
      this.vertices = data.vertices
      this.faces = data.faces
      this.uniqueMaterials = data.uniqueMaterials
      this.materialCount = data.materialCount
  }
}

const getModelMetadata = (scene: THREE.Group, filePath: string) => {
  if (!scene) return null

  let totalVertices = 0
  let totalFaces = 0
  const materials = new Set<string>()

  scene.traverse((child: any) => {
    if (child.isMesh) {
      const geometry = child.geometry
      
      // Calculate Vertices
      if (geometry.attributes.position) {
        totalVertices += geometry.attributes.position.count
      }

      // Calculate Faces (Triangles)
      if (geometry.index) {
        totalFaces += geometry.index.count / 3
      } else if (geometry.attributes.position) {
        totalFaces += geometry.attributes.position.count / 3
      }

      // Collect Materials
      if (Array.isArray(child.material)) {
        child.material.forEach((m: THREE.Material) => materials.add(m.name || 'Unnamed Material'))
      } else {
        materials.add(child.material.name || 'Unnamed Material')
      }
    }
  })

  return {
    fileName: filePath.split('/').pop(),
    vertices: totalVertices,
    faces: totalFaces,
    uniqueMaterials: Array.from(materials),
    materialCount: materials.size,
    timestamp: new Date()
  }
}


