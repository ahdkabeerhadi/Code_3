import React from 'react'

interface FeaturesBlockProps {
  title: string
  subtitle?: string
  features: Array<{
    icon?: string
    image?: {
      url: string
      alt: string
    }
    title: string
    description: string
    size: 'small' | 'medium' | 'large'
    hasImage: boolean
    backgroundColor?: 'white' | 'dark' | 'red'
  }>
  layout: 'asymmetric-grid' | 'grid' | 'carousel' | 'list'
  backgroundColor: 'white' | 'gray' | 'blue'
  accentColor: string
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ 
  title, 
  subtitle, 
  features, 
  layout, 
  backgroundColor,
  accentColor = '#dc2626'
}) => {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-50'
  }

  // Define specific grid areas for asymmetric layout
  const getAsymmetricLayout = () => {
    const layoutClasses = [
      // Feature 1 - Large left (spans 2 columns, 2 rows)
      'col-span-6 row-span-3 md:col-span-6 md:row-span-3',
      // Feature 2 - Top right red block
      'col-span-6 row-span-2 md:col-span-6 md:row-span-2',
      // Feature 3 - Bottom left 
      'col-span-6 row-span-2 md:col-span-6 md:row-span-2',
      // Feature 4 - Bottom right red block
      'col-span-6 row-span-2 md:col-span-6 md:row-span-2',
      // Feature 5 - Large bottom right (if exists)
      'col-span-6 row-span-3 md:col-span-6 md:row-span-3',
      // Feature 6 - Small bottom (if exists)
      'col-span-6 row-span-1 md:col-span-6 md:row-span-1'
    ]
    return layoutClasses
  }

  const getFeatureBackground = (feature: any, index: number) => {
    if (feature.backgroundColor === 'dark') {
      return 'bg-slate-800 text-white'
    }
    if (feature.backgroundColor === 'red') {
      return `text-white`
    }
    return 'bg-white shadow-lg'
  }

  const asymmetricClasses = getAsymmetricLayout()

  if (layout === 'asymmetric-grid') {
    return (
      <section className={`py-16 ${bgClasses[backgroundColor]}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div 
              className="inline-block px-6 py-2 rounded-full text-white text-sm font-semibold mb-6"
              style={{ backgroundColor: accentColor }}
            >
              WHY CHOOSE US
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
          </div>
          
          {/* Custom Asymmetric Grid Layout */}
          <div className="grid grid-cols-12 gap-6 h-auto">
            {/* Feature 1 - Large Left Block */}
            {features[0] && (
              <div className="col-span-12 md:col-span-5">
                <div 
                  className={`h-full rounded-2xl border overflow-hidden relative ${getFeatureBackground(features[0], 0)} min-h-[300px] md:h-[450px]`}
                  style={features[0].backgroundColor === 'red' ? { backgroundColor: accentColor } : {}}
                >
                  {/* Background Image */}
                  {features[0].hasImage && features[0].image && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${features[0].image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-top from-black via-black/10 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <h3 className="absolute top-6 left-6">
                      <span className='bg-white text-black uppercase px-4 py-2 rounded-full text-xs font-medium'>{features[0].title}</span>
                    </h3>
                    <p className="text-white opacity-90 text-xl">
                      {features[0].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 2 - Top Right Red Block */}
            {features[1] && (
              <div className="col-span-12 md:col-span-7">
                <div 
                  className={`rounded-2xl p-6 border flex flex-col relative justify-center text-center min-h-[300px] md:h-[450px]`}
                  style={features[1].backgroundColor === 'red' ? { backgroundColor: accentColor } : {}}
                >
                  {/* Background Image */}
                  {features[1].hasImage && features[1].image && (
                    <div 
                      className="absolute rounded-2xl inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${features[1].image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                    </div>
                  )}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <h3 className="absolute top-6 left-6">
                        <span className='bg-white text-black uppercase px-4 py-2 rounded-full text-xs font-medium'>{features[1].title}</span>
                      </h3>
                    <p className="text-black text-start max-w-xs opacity-90 text-xl">
                      {features[1].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 3 - Middle Right Block */}
            {features[2] && (
              <div className="col-span-12 md:col-span-7">
                <div 
                  className={`h-full rounded-2xl border overflow-hidden relative ${getFeatureBackground(features[2], 2)} min-h-[300px] md:h-[450px]`}
                  style={features[2].backgroundColor === 'red' ? { backgroundColor: accentColor } : {}}
                >
                  {/* Background Image */}
                  {features[2].hasImage && features[2].image && (
                    <div 
                      className="absolute rounded-2xl inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${features[2].image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                    </div>
                  )}
                  
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <h3 className="absolute top-6 left-6">
                        <span className='bg-white text-black uppercase px-4 py-2 rounded-full text-xs font-medium'>{features[2].title}</span>
                      </h3>
                    <p className="text-black max-w-xs opacity-90 text-xl">
                      {features[2].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 4 - Bottom Left Block */}
            {features[3] && (
              <div className="col-span-12 md:col-span-5">
                <div 
                  className={`rounded-2xl p-6 border relative flex flex-col justify-center min-h-[300px] md:h-[450px]`}
                  style={features[3].backgroundColor === 'red' ? { backgroundColor: accentColor } : {}}
                >
                  {features[3].hasImage && features[3].image && (
                    <div 
                      className="absolute rounded-2xl inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${features[3].image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-top from-black via-black/10 to-transparent"></div>
                    </div>
                  )}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <h3 className="absolute top-6 left-6">
                        <span className='bg-white text-black px-4 py-2 uppercase rounded-full text-xs font-medium'>{features[3].title}</span>
                      </h3>
                    <p className="text-white opacity-90 text-xl">
                      {features[3].description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Additional features if they exist */}
            {features.slice(4).map((feature, index) => (
              <div key={index + 4} className="col-span-12 md:col-span-4 row-span-1">
                <div 
                  className={`h-full rounded-2xl border overflow-hidden relative ${getFeatureBackground(feature, index + 4)} min-h-[200px]`}
                  style={feature.backgroundColor === 'red' ? { backgroundColor: accentColor } : {}}
                >
                  {feature.hasImage && feature.image && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${feature.image.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                  )}
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                    {feature.icon && !feature.hasImage && (
                      <div className="text-3xl mb-3">{feature.icon}</div>
                    )}
                    <h3 className="text-lg font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Standard layouts (grid, list, carousel) remain the same
  return (
    <section className={`py-16 ${bgClasses[backgroundColor]}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
        </div>
        
        <div className={`
          ${layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''}
          ${layout === 'list' ? 'space-y-6' : ''}
          ${layout === 'carousel' ? 'flex overflow-x-auto space-x-6' : ''}
        `}>
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}