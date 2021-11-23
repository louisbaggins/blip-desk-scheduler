import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/named
import { withLoadingAsync } from '../../services/common-service';
import { getApplicationDataAsync } from '../../services/application-service';
import {
    getResourceAsync,
    saveResourceAsync
} from '../../services/resources-service';

import settings from '../../config';

import Header from './components/Header';
import Button from '../../components/Button';
import { DEFAULT_TIME } from './constants';
import './index.css';
import DayOff from './components/DaysOff';
import ListWeek from './components/ListWeek';

const PAGE_ICON = 'plugin';
const BLANK = '_blank';
const WORK_TIME_NAME = 'workTime';

const Home = () => {
    const [times, setTimes] = useState(null);
    const [application, setApplication] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        withLoadingAsync(async () => {
            setApplication(await getApplicationDataAsync());
            try {
                const resourceTimes = JSON.parse(
                    await getResourceAsync(WORK_TIME_NAME)
                );
                if (resourceTimes.weekdays && resourceTimes.noWorkDays) {
                    setTimes(resourceTimes);
                } else {
                    setTimes(DEFAULT_TIME);
                }
            } catch (error) {
                setTimes(DEFAULT_TIME);
            }
        });
    }, [application.shortName]);

    const saveAsync = async () => {
        await saveResourceAsync(WORK_TIME_NAME, times);
    };

    const removeDayOff = (index) => {
        const newVal = { ...times };
        newVal.noWorkDays.splice(index, 1);
        setTimes(newVal);
    };

    const removeWorkTime = (indexWeek, indexHour) => {
        const newVal = { ...times };
        newVal.weekdays[indexWeek].workTimes.splice(indexHour, 1);
        setTimes(newVal);
    };

    const changeStart = (indexWeek, indexHour, event) => {
        const newVal = { ...times };
        const weekdays = newVal.weekdays[indexWeek];
        const workTime = weekdays.workTimes.find(
            (_item, index) => index === indexHour
        );
        if (workTime) {
            workTime.start = event.target.value;
        }
        setTimes(newVal);
    };

    const changeEnd = (indexWeek, indexHour, event) => {
        const newVal = { ...times };
        const weekdays = newVal.weekdays[indexWeek];
        const workTime = weekdays.workTimes.find(
            (_item, index) => index === indexHour
        );
        if (workTime) {
            workTime.end = event.target.value;
        }
        setTimes(newVal);
    };

    const changeDayOff = (index, event) => {
        const newVal = { ...times };
        newVal.noWorkDays[index] = event.target.value;
        setTimes(newVal);
    };

    const addWorkTime = (index) => {
        const newItem = {
            start: '09:00',
            end: '19:00'
        };

        const newVal = { ...times };
        if (newVal.weekdays[index].workTimes) {
            newVal.weekdays[index].workTimes.push(newItem);
        } else {
            newVal.weekdays[index].workTimes = [newItem];
        }
        setTimes(newVal);
    };

    const addDayOff = () => {
        const newItem = 'MM-DD';
        const newVal = { ...times };
        newVal.noWorkDays.push(newItem);
        setTimes(newVal);
    };

    if (times != null) {
        return (
            <div className="ph1 ph4-m ph5-ns pb5">
                <Header
                    title={t('title.homePage')}
                    icon={PAGE_ICON}
                    onClick={() => window.open(settings.repositoryUrl, BLANK)}
                />
                <h2>Dias de trabalho</h2>
                <div className="week-container">
                    <ListWeek
                        times={times}
                        changeStart={changeStart}
                        changeEnd={changeEnd}
                        removeWorkTime={removeWorkTime}
                        addWorkTime={addWorkTime}
                    />
                </div>
                <h2>Dias sem trabalhos</h2>
                <DayOff
                    noWorkDays={times.noWorkDays}
                    changeDayOff={changeDayOff}
                    removeDayOff={removeDayOff}
                    addDayOff={addDayOff}
                />
                <br />
                <br />
                <Button
                    text={t('labels.save')}
                    icon="save-disk"
                    variant="primary"
                    arrow={false}
                    disabled={false}
                    onClick={saveAsync}
                />
            </div>
        );
    }
    return (
        <div className="ph1 ph4-m ph5-ns pb5">
            <h2>{t('loading')}</h2>
        </div>
    );
};

Home.propTypes = {};

export default Home;
