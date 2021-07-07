import { useEffect } from 'react'
import { database } from '../auth/FirebaseAuth'

type Details = {
    amount: number
    name: string
}

interface DataProps {
    cleared: number
    deliveryTotal: number
    details: Details[]
    discountTotal: number
    foodTotal: number
    orderDate: string
    payBy: string
}

export const Dashboard = (): JSX.Element => {
    const dataFromServer: DataProps[] = []

    useEffect((): void => {
        database.ref().on('value', (snapshot): void => {
            snapshot.forEach((data): void => {
                dataFromServer.push(data.val())
            })
            console.log(dataFromServer)
        })
    })

    return (
        <>
            <h1>dashboard</h1>
        </>
    )
}
