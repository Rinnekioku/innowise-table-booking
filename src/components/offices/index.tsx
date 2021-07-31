import React from 'react';
import {Space, Card, Button, PageHeader} from 'antd';

export function Offices(){
    const routes= [
        {
            path: '/',
            breadcrumbName: 'Home'
        },
        {
            path: '/offices',
            breadcrumbName: 'Offices'
        }
    ];

    return (
        <>
            <PageHeader
                title='Offices'
                breadcrumb={{routes}}
            />
            <Space>
                <Card>
                First office<br/>
                    <Button>Go to</Button>
                </Card>

                <Card>
                Second office<br/>
                    <Button>Go to</Button>
                </Card>

                <Card>
                    Third office<br/>
                    <Button>Go to</Button>
                </Card>
            </Space>
        </>
    );
}
