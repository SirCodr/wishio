'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Eye,
  Leaf
} from 'lucide-react'
import Link from 'next/link'

export default function Landing() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section con verde prominente */}
      <section className='relative min-h-screen flex items-center overflow-hidden'>
        {/* Background con verde vibrante */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5' />
        <div className='absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse' />
        <div
          className='absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[100px] animate-pulse'
          style={{ animationDelay: '1s' }}
        />

        {/* Grid decorativo */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]' />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 w-full'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Lado izquierdo - Contenido */}
            <div>
              <Badge
                variant='outline'
                className='mb-8 px-6 py-2.5 bg-primary/10 border-primary/30 text-primary font-semibold'
              >
                <Leaf className='h-4 w-4 mr-2 inline' />
                Organiza. Prioriza. Conquista.
              </Badge>

              <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95]'>
                Tu wishlist,
                <br />
                <span className='text-primary'>reinventada</span>
              </h1>

              <p className='text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-xl'>
                La plataforma más inteligente para gestionar tus deseos de
                compra. Con seguimiento de precios, prioridades y una
                experiencia visual impecable.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 mb-16'>
                <Button
                  size='lg'
                  className='text-lg px-10 py-7 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all'
                  asChild
                >
                  <Link href='/sign-in'>
                    <Zap className='mr-2 h-5 w-5' />
                    Comenzar gratis
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              {/* <div className='flex items-center gap-12'>
                <div>
                  <div className='text-4xl font-bold text-primary mb-1'>
                    10K+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Usuarios felices
                  </div>
                </div>
                <div className='h-12 w-px bg-border' />
                <div>
                  <div className='text-4xl font-bold text-primary mb-1'>
                    50K+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    Wishes organizados
                  </div>
                </div>
                <div className='h-12 w-px bg-border' />
                <div>
                  <div className='text-4xl font-bold text-primary mb-1'>
                    $2M+
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    En ahorros
                  </div>
                </div>
              </div> */}
            </div>

            {/* Lado derecho - Cards preview */}
            <div className='relative'>
              <div className='space-y-6'>
                {/* Card 1 - Destacado con verde */}
                <Card className='p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 shadow-2xl shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all'>
                  <div className='flex items-start gap-4'>
                    <div className='h-24 w-24 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shrink-0'>
                      <span className='text-3xl font-bold text-primary-foreground'>
                        MB
                      </span>
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-3'>
                        <h3 className='font-bold text-xl'>
                          MacBook Pro M3 Max
                        </h3>
                        <Heart className='h-5 w-5 text-primary fill-primary' />
                      </div>
                      <p className='text-sm text-muted-foreground mb-3'>
                        La bestia para trabajo profesional
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-bold text-primary'>
                          $8.999.000
                        </span>
                        <Badge className='bg-red-500/10 text-red-700 border-red-200'>
                          Prioridad Alta
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Card 2 */}
                <Card className='p-6 hover:shadow-xl hover:scale-105 transition-all'>
                  <div className='flex items-start gap-4'>
                    <div className='h-24 w-24 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center shrink-0'>
                      <span className='text-3xl font-bold text-yellow-700'>
                        AJ
                      </span>
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-3'>
                        <h3 className='font-bold text-xl'>
                          Air Jordan 1 Retro
                        </h3>
                        <Heart className='h-5 w-5 text-muted-foreground hover:text-primary transition-colors' />
                      </div>
                      <p className='text-sm text-muted-foreground mb-3'>
                        Clásico atemporal
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-bold'>$850.000</span>
                        <Badge className='bg-yellow-500/10 text-yellow-700 border-yellow-200'>
                          Prioridad Media
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Card 3 - Comprado */}
                <Card className='p-6 bg-muted/50 hover:shadow-xl hover:scale-105 transition-all opacity-75'>
                  <div className='flex items-start gap-4'>
                    <div className='h-24 w-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0'>
                      <CheckCircle2 className='h-12 w-12 text-primary' />
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-start justify-between mb-3'>
                        <h3 className='font-bold text-xl line-through'>
                          iPhone 15 Pro Max
                        </h3>
                        <Heart className='h-5 w-5 text-primary fill-primary' />
                      </div>
                      <p className='text-sm text-muted-foreground mb-3'>
                        Titanio Natural 256GB
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-bold line-through'>
                          $5.500.000
                        </span>
                        <Badge className='bg-primary/10 text-primary border-primary/20'>
                          ✓ Comprado
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Elemento decorativo flotante */}
              <div className='absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse' />
              <div
                className='absolute -bottom-8 -left-8 w-40 h-40 bg-primary/15 rounded-full blur-2xl animate-pulse'
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden'>
        {/* Decoración de fondo */}
        <div className='absolute top-0 left-1/2 w-[1000px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2' />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <Badge
              variant='outline'
              className='mb-6 px-6 py-2 bg-primary/5 border-primary/20 text-primary'
            >
              Características poderosas
            </Badge>
            <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-6'>
              Todo lo que necesitas
              <br />
              <span className='text-primary'>y nada que no uses</span>
            </h2>
            <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto'>
              Diseñado para simplificar tu vida y potenciar tus decisiones de
              compra
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* Feature 1 - Destacado */}
            <Card className='md:col-span-2 p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 transition-all group'>
              <div className='flex items-start gap-8'>
                <div className='h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xl shadow-primary/30'>
                  <Target className='h-10 w-10 text-primary-foreground' />
                </div>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors'>
                    Prioriza inteligentemente
                  </h3>
                  <p className='text-lg md:text-xl text-muted-foreground leading-relaxed'>
                    Define prioridades alta, media o baja. Enfócate en lo que
                    realmente importa y toma decisiones de compra más
                    inteligentes con un sistema visual claro.
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className='p-8 hover:shadow-xl hover:scale-105 transition-all group'>
              <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20'>
                <Heart className='h-8 w-8 text-primary-foreground' />
              </div>
              <h3 className='text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                Favoritos instantáneos
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                Marca tus wishes favoritos con un toque. Accede rápidamente a
                los productos que más deseas sin perder tiempo.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className='p-8 hover:shadow-xl hover:scale-105 transition-all group relative'>
              <Badge className='absolute top-4 right-4 bg-primary/10 text-primary border-primary/30'>
                Pronto
              </Badge>
              <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20'>
                <TrendingUp className='h-8 w-8 text-primary-foreground' />
              </div>
              <h3 className='text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                Seguimiento de precios
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                Mantén el control de tus gastos. Visualiza precios y planifica
                tus compras con precisión.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className='p-8 hover:shadow-xl hover:scale-105 transition-all group'>
              <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20'>
                <CheckCircle2 className='h-8 w-8 text-primary-foreground' />
              </div>
              <h3 className='text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                Estados personalizados
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                Marca wishes como pendientes, comprados o descartados. Organiza
                tu proceso de compra de principio a fin.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card className='p-8 hover:shadow-xl hover:scale-105 transition-all group'>
              <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20'>
                <Sparkles className='h-8 w-8 text-primary-foreground' />
              </div>
              <h3 className='text-2xl font-bold mb-3 group-hover:text-primary transition-colors'>
                Interfaz elegante
              </h3>
              <p className='text-muted-foreground leading-relaxed'>
                Diseño moderno y minimalista que hace que organizar tus deseos
                sea un placer visual.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final con verde prominente */}
      <section className='py-32 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%)]' />

        {/* Elementos decorativos */}
        <div className='absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl' />

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10'>
          <Sparkles className='h-20 w-20 text-primary-foreground mx-auto mb-8 animate-pulse' />
          <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-primary-foreground leading-tight'>
            Transforma tus deseos
            <br />
            en realidad
          </h2>
          <p className='text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto leading-relaxed'>
            Únete a miles de usuarios que ya organizan sus compras de manera
            inteligente con Wishio
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-8'>
            <Button
              size='lg'
              variant='secondary'
              className='text-xl px-14 py-8 shadow-2xl hover:scale-110 transition-all'
              asChild
            >
              <Link href='/sign-in'>
                <Zap className='mr-2 h-6 w-6' />
                Comenzar gratis ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
