import React from 'react'

import { List, ListItem } from "@tremor/react";

import MonthlyExpenditure from '../components/MonthlyExpenditure';
import InventoryOverview from '../components/InventoryOverview';


import { Card, Title, Metric, Subtitle, Text } from "@tremor/react";


const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;


function Dashboard(){

        const expiringArray = [
            {
                name: "Apple",
                quantity: "5",
            }
        ]

        const lowInventoryArray = [
            {
                name:"Apple",
                quantity: "2",
            }
        ]
     
        return (
            <>

              
            <div className='flex flex-col items-center my-6 p-6 gap-6'>
                <Card>
                    <Title>Number of species threatened with extinction (2021)</Title>
                    <Subtitle>
                    The IUCN Red List has assessed only a small share of the total known species in the world.
                    </Subtitle>
                </Card>
                
                <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
                    <Text>Sales</Text>
                    <Metric>$ 34,743</Metric>
                </Card>

                <Card>
                    <Title>Montlhy Expenditure</Title>
                    <Subtitle>October 2023</Subtitle>
                    <MonthlyExpenditure />
                </Card>

                <Card>
                    <Title>Inventory Overview</Title>
                    <InventoryOverview />
                </Card>

                
                <div className='container'>
                    
                    <div className='grid grid-cols-4 gap-6'>

                        <div className='col-span-2 border border-black p-3'>
                            <List>
                                {expiringArray.map((item) => (
                                    <ListItem key={item.name}>
                                    <span>{item.name}</span>
                                    <span>{item.quantity}</span>
                                    </ListItem>
                                ))}
                            </List>
                        </div>

                        <div className='col-span-2 border border-black p-3'>
                            <List>
                                {lowInventoryArray.map((item) => (
                                    <ListItem key={item.name}>
                                    <span>{item.name}</span>
                                    <span>{item.quantity}</span>
                                    </ListItem>
                                ))}
                            </List>
                        </div>

                    </div>


                </div>

                  
            </div>
            </>
        )
                                
}

export default Dashboard;