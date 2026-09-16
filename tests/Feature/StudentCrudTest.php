<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_edit_and_delete_students(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $this->post(route('students.store'), [
            'first_name' => 'Alice',
            'last_name' => 'Example',
            'email' => 'alice@example.com',
            'program' => 'BSIT',
            'gender' => 'female',
            'birthday' => '2001-05-10',
            'yr_level' => '2',
        ])->assertRedirect(route('students.index'));

        $this->assertDatabaseHas('students', [
            'email' => 'alice@example.com',
            'program' => 'BSIT',
        ]);

        $student = Student::first();

        $this->put(route('students.update', $student), [
            'first_name' => 'Alicia',
            'last_name' => 'Updated',
            'email' => 'alicia@example.com',
            'program' => 'BSCS',
            'gender' => 'female',
            'birthday' => '2000-04-01',
            'yr_level' => '3',
        ])->assertRedirect(route('students.index'));

        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'email' => 'alicia@example.com',
            'program' => 'BSCS',
        ]);

        $this->delete(route('students.destroy', $student))
            ->assertRedirect(route('students.index'));

        $this->assertDatabaseMissing('students', [
            'id' => $student->id,
        ]);
    }
}
