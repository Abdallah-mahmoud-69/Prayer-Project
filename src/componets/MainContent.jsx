import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayers from "./Prayers";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForkRef } from "@mui/material";
import moment from "moment";
import "moment/locale/ar-kw";
moment.locale("ar-kw");
export default function MainComponet() {
  // States
  const [timings, setTimings] = useState({
    Fajr: "04:27",
    Dhuhr: "12:01",
    Asr: "15:30",
    Maghrib: "18:09",
    Isha: "19:27",
  });

  const [reaminingTime, setreaminingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهره",
    apiName: "Cario",
  });

  const [today, setToday] = useState("");

  const [timer, setTimer] = useState(10);

  const [nextPrayerIndex, setNextPrayerIndex] = useState(1);
  // End States
  const getTimings = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiName}`
    );
    setTimings(data.data.data.timings);
  };

  const avalibelCity = [
    {
      displayName: "القاهره",
      apiName: "Cario",
    },
    {
      displayName: "الجيزه",
      apiName: "Giza",
    },
    {
      displayName: "الأسكندريه",
      apiName: "ALX",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountDownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("LLLa"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  // const data = axios.get(
  //   "https://api.aladhan.com/v1/timingsByCity?country=EG&city=Gize"
  // );
  // setTimings(data.data.timings);

  // Start Function

  const handleCityChange = (event) => {
    const cityObject = avalibelCity.find((city) => {
      return city.apiName === event.target.value;
    });
    setSelectedCity(cityObject);
  };

  const setupCountDownTimer = () => {
    const momentNow = moment();
    let PrayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }

    setNextPrayerIndex(PrayerIndex);

    const nextPrayerObject = prayersArray[PrayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let reaminingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (reaminingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrTomidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDifference = midnightDiff + fajrTomidnightDiff;

      reaminingTime = totalDifference;
    }

    const durtionReaminingTime = moment.duration(reaminingTime);

    setreaminingTime(
      `${durtionReaminingTime.seconds()} : ${durtionReaminingTime.minutes()} : ${durtionReaminingTime.hours()}`
    );
  };
  // Start Function
  // End Jave

  return (
    <>
      {/* Top Row */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتي صلاه {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{reaminingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/* End Top Row */}
      <Divider style={{ borderColor: "white", opacity: "0.2" }} />

      {/* Prayers Cards */}
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        style={{ marginTop: "50px" }}
      >
        <Prayers
          name={"الفجر"}
          time={timings.Fajr}
          image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
        />
        <Prayers
          name={"الظهر"}
          time={timings.Dhuhr}
          image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
        />
        <Prayers
          name={"العصر"}
          time={timings.Asr}
          image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <Prayers
          name={"المغرب"}
          time={timings.Maghrib}
          image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />
        <Prayers
          name={"العشاء"}
          time={timings.Isha}
          image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
        />
      </Stack>
      {/* Prayers Cards */}
      {/* Select City */}
      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: "white", fontSize: "20px" }}
          >
            المدينه
          </InputLabel>
          <Select
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="age"
            onChange={handleCityChange}
          >
            {avalibelCity.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* Select City */}
    </>
  );
}
