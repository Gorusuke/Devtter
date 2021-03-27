const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnits] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnits || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnits)
      return { value, unit }
    }
  }
}

const useTimeAgo = (timestamp) => {
  const { value, unit } = getDateDiffs(timestamp)
  const rft = new Intl.RelativeTimeFormat("es", { style: "short" })
  return rft.format(value, unit)
}

export default useTimeAgo
