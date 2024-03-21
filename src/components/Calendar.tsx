import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns"
import { type FC, type ReactNode, useState } from "react"
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native"

import {
  CALENDAR_BORDER,
  CALENDAR_PADDING_X,
  DAY_GAP,
  DAYS_IN_ROW,
  MARGIN_X
} from "../core/constants"
import ArrowIcon from "./icons/ArrowIcon"

const TODAY = new Date()

const Calendar: FC = () => {
  const { width: screenWidth } = useWindowDimensions()

  // Calculate the size of each day based on the number of days in a row,
  // accounting for screen width, margins, padding, and gaps
  const daySize =
    (screenWidth -
      MARGIN_X * 2 -
      CALENDAR_PADDING_X * 2 -
      CALENDAR_BORDER * 2 -
      DAY_GAP * (DAYS_IN_ROW - 1)) /
    DAYS_IN_ROW

  const [activeDate, setActiveDate] = useState(TODAY)
  const [selectedDate, setSelectedDate] = useState(TODAY)

  const handleSelectDate = (d: Date): void => {
    if (isSameDay(selectedDate, d)) return

    setSelectedDate(d)
  }

  const generateDatesForCurrentWeek = (date: Date, activeDate: Date): ReactNode => {
    let currentDate = date
    const week = []

    for (let day = 0; day < DAYS_IN_ROW; day++) {
      const cloneDate = currentDate

      week.push(
        <Pressable
          key={day}
          onPress={() => {
            handleSelectDate(cloneDate)
          }}
          style={[
            styles.dayWrapper,
            { width: daySize, height: daySize },
            isSameDay(currentDate, TODAY) && styles.today,
            isSameDay(currentDate, selectedDate) && styles.selectedDate
          ]}
        >
          <Text
            style={[
              styles.day,
              !isSameMonth(currentDate, activeDate) ? styles.inactiveDay : styles.activeDay
            ]}
          >
            {format(currentDate, "d")}
          </Text>
        </Pressable>
      )
      currentDate = addDays(currentDate, 1)
    }

    return (
      <View key={format(date, "yyyy-MM-dd")} style={[styles.row, styles.weekWrapper]}>
        {week}
      </View>
    )
  }

  const getDates = (): ReactNode => {
    const startOfTheSelectedMonth = startOfMonth(activeDate)
    const endOfTheSelectedMonth = endOfMonth(activeDate)
    const startDate = startOfWeek(startOfTheSelectedMonth)
    const endDate = endOfWeek(endOfTheSelectedMonth)

    let currentDate = startDate
    const allWeeks = []

    while (currentDate <= endDate) {
      allWeeks.push(generateDatesForCurrentWeek(currentDate, activeDate))
      currentDate = addDays(currentDate, DAYS_IN_ROW)
    }

    return <View style={styles.monthWrapper}>{allWeeks}</View>
  }

  return (
    <View style={[styles.fullW, styles.calendarWrapper]}>
      <View style={[styles.row, styles.header]}>
        <View style={[styles.row, styles.dateNavigationWrapper]}>
          <Text style={styles.month}>{format(activeDate, "MMMM")}</Text>
          <Text style={styles.year}>{format(activeDate, "yyyy")}</Text>
        </View>
        <View style={[styles.row, styles.monthNavigationWrapper]}>
          <TouchableOpacity
            hitSlop={7}
            onPress={() => {
              setActiveDate(subMonths(activeDate, 1))
            }}
          >
            <ArrowIcon style={styles.turnLeft} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={7}
            onPress={() => {
              setActiveDate(addMonths(activeDate, 1))
            }}
          >
            <ArrowIcon />
          </TouchableOpacity>
        </View>
      </View>

      {getDates()}
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  fullW: { width: "100%" },
  row: { flexDirection: "row", alignItems: "center" },
  calendarWrapper: {
    paddingHorizontal: 11,
    paddingVertical: CALENDAR_PADDING_X,
    backgroundColor: "#131313",
    borderWidth: CALENDAR_BORDER,
    borderColor: "#B7B7B75E",
    borderRadius: 6
  },
  header: {
    justifyContent: "space-between",
    paddingLeft: 7,
    paddingRight: 10,
    marginBottom: 20
  },
  dateNavigationWrapper: {
    alignItems: "baseline",
    gap: 4
  },
  monthNavigationWrapper: { gap: 15 },
  month: {
    fontFamily: "poppins-medium",
    fontSize: 15,
    color: "#fff"
  },
  year: { fontFamily: "poppins-medium", fontSize: 25, color: "#fff" },
  turnLeft: { transform: [{ rotate: "180deg" }] },
  monthWrapper: { gap: 8 },
  weekWrapper: { gap: DAY_GAP },
  dayWrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  day: { fontFamily: "poppins-medium", fontSize: 15 },
  activeDay: { color: "#fff" },
  inactiveDay: { color: "#9e9e9e" },
  today: { backgroundColor: "#9e9e9e", borderRadius: 100 },
  selectedDate: { backgroundColor: "#00A19B", borderRadius: 100 }
})
