<?php

namespace App\Models;

use Database\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @use HasFactory<StudentFactory>
 */
class Student extends Model
{
    /** @use HasFactory<StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'program',
        'gender',
        'birthday',
        'yr_level',
    ];

    protected $casts = [
        'birthday' => 'date',
    ];

    protected $appends = [
        'age',
    ];

    public function getAgeAttribute(): ?int
    {
        $birthday = $this->birthday;

        if ($birthday === null) {
            return null;
        }

        return $birthday->age;
    }
}
