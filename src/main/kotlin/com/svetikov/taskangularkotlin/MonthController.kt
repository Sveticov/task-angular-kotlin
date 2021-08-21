package com.svetikov.taskangularkotlin

import com.svetikov.taskangularkotlin.model.MonthData
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/month")
class MonthController(val service: ImplServiceMonth) {

    @GetMapping("/one")
    fun oneMonth() = MonthData(1, "september", 9)


    @GetMapping("/{id}")
    fun foundMonthByWorld(@PathVariable id: Int) =
        ResponseEntity.ok(service.findMonthByID(id))


    @GetMapping("/delete/{id}")
    fun deleteMonthByWorld(@PathVariable id: Int) =
        service.deleteMonthByID(id)


    @GetMapping("list/{world}")
    fun findAllMonthsContainsWorld(@PathVariable world: String) =
        ResponseEntity.ok(service.findMonthWorld(world))


    @GetMapping("list/")
    fun findAllMonthsContains() = ResponseEntity.ok(service.findAllMonths())

    @PostMapping()
    fun createNewMethod(@RequestBody monthData: MonthWithoutID): Boolean {
        println(monthData)
        service.saveNewMonth(MonthData(service.getLastId() + 1, monthData.name, monthData.number))
        return true
    }

    @PutMapping()
    fun editMethod(@RequestBody monthData: MonthData): Boolean {
        println("update $monthData")
        service.updataMonth(monthData)
        return true
    }

}

data class MonthWithoutID(val number: Int, val name: String)

@Service
class MonthService : ImplServiceMonth {
    val list = mutableListOf<MonthData>(
        MonthData(1, "jun", 1),
        MonthData(2, "feb", 2),
        MonthData(3, "mart", 3),
        MonthData(4, "apr", 4),
        MonthData(5, "may", 5),
        MonthData(6, "jul", 6),
        MonthData(7, "jun", 7),
        MonthData(8, "aug", 8),
        MonthData(9, "sep", 9),
        MonthData(100, "The quick brown fox jumps over the lazy dog", 100),
    )

    override fun getLastId() = list.maxOf { it.id }

    override fun findMonthWorld(world: String): List<MonthData> {
        println("$world  /// ${world.isNullOrBlank()} ///${world.isNullOrEmpty()}")
        if (world.isNullOrBlank()) return list
        return list.filter { it.name.contains(world) }
    }

    override fun findMonthByID(id: Int): MonthData? {
        return list.find { it.id == id }
    }

    override fun deleteMonthByID(id: Int) {
        val monthData = list.find { it.id == id }
        list.remove(monthData)
    }

    override fun findAllMonths() = list
    override fun saveNewMonth(monthData: MonthData) {
        list.add(monthData)
    }

    override fun updataMonth(monthData: MonthData) {
        val month = list.find { it.id == monthData.id }
        println(month)
        list.remove(month)

        list.add(MonthData(month!!.id,monthData.name,monthData.number))

    }
}

interface ImplServiceMonth {

    fun getLastId(): Int
    fun findMonthWorld(world: String): List<MonthData>
    fun findMonthByID(id: Int): MonthData?
    fun deleteMonthByID(id: Int)
    fun findAllMonths(): List<MonthData>?
    fun saveNewMonth(monthData: MonthData) {

    }

    fun updataMonth(monthData: MonthData) {

    }
}
