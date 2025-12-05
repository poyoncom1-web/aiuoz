'use client'

import {useCallback} from 'react'
import Particles from 'react-tsparticles'
import {loadSlim} from 'tsparticles-slim'
import type {Engine} from 'tsparticles-engine'


export function ParticleBackground() {

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine)
    }, [])


    return (
        <Particles

            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: '#0a0a0a',
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        onHover: {
                            enable: true,
                            mode: 'repulse',
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: '#3b82f6',
                    },
                    links: {
                        color: '#60a5fa',
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: {min: 1, max: 5},
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 -z-10"
        />
    )
}