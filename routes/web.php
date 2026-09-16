<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Models\Student;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::resource('students', StudentController::class);

    Route::get('dashboard', function () {
        $programDistribution = Student::query()
            ->selectRaw('program, COUNT(*) as total')
            ->groupBy('program')
            ->orderByDesc('total')
            ->get()
            ->map(fn (Student $student): array => [
                'label' => $student->program,
                'total' => (int) $student->total,
            ])
            ->values();

        $statusBreakdown = Student::query()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->orderByDesc('total')
            ->get()
            ->map(fn (Student $student): array => [
                'label' => ucfirst($student->status),
                'total' => (int) $student->total,
            ])
            ->values();

        return Inertia::render('dashboard', [
            'totalStudents' => Student::count(),
            'programDistribution' => $programDistribution,
            'statusBreakdown' => $statusBreakdown,
            'recentStudents' => Student::query()
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';
